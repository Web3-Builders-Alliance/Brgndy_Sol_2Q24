import * as anchor from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, Connection, PublicKey } from "@solana/web3.js";
import { Program, } from "@coral-xyz/anchor";
import { FunderDao } from "../target/types/funder_dao";
import * as splToken from "@solana/spl-token";
import {
  Account,
  AccountLayout,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { assert } from "chai";

async function getTokenAccountBalance(
  connection: Connection,
  pk: PublicKey
): Promise<string> {
  let amount = (await connection.getTokenAccountBalance(pk)).value.amount;

  return amount;
}

const confirmTx = async (signature: string) => {
  const latestBlockhash = await anchor
    .getProvider()
    .connection.getLatestBlockhash();
  await anchor.getProvider().connection.confirmTransaction({
    signature,
    ...latestBlockhash,
  });
  return signature;
};

describe("funder-dao", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env();
  const program = anchor.workspace.FunderDao as Program<FunderDao>;
  const platformAuth = anchor.web3.Keypair.generate();
  const platformSeed = new anchor.BN(10);
  const daysToUnstake = new anchor.BN(30);
  const VotingEndTimestamp = new anchor.BN(99999999999);
  const stakingAmount = new anchor.BN(30);
  const unStakingAmount = new anchor.BN(15);


  //const daysToVoteCorrect = new anchor.BN(1);
  const projectName = "testProject";
  const projectMaker = anchor.web3.Keypair.generate();
  const voter = anchor.web3.Keypair.generate();
  const idea_for = true;
  const strategy_for = true;
  const ask_for = true;
  let platformMint: anchor.web3.PublicKey;
  let voterAta: Account;
  let votingState: anchor.web3.PublicKey;
  let voterStackedAta: anchor.web3.PublicKey;
  let voterData: anchor.web3.PublicKey;
  let config: anchor.web3.PublicKey;
  let voterHistory: anchor.web3.PublicKey;

  it("Airdrops", async () => {
    await Promise.all(
      [platformAuth, projectMaker, voter].map(async (account) => {
        await provider.connection
          .requestAirdrop(account.publicKey, 100 * LAMPORTS_PER_SOL)
          .then(confirmTx);
      })
    );
  });

  it("Create platform mint", async () => {
    platformMint = await splToken.createMint(
      provider.connection,
      platformAuth,
      platformAuth.publicKey,
      platformAuth.publicKey,
      6
    );
  });


  it("Create ATAs", async () => {

    voterAta = await getOrCreateAssociatedTokenAccount(provider.connection, voter, platformMint, voter.publicKey, false);

  });

  it("Mint to voter", async () => {
    const minting = await mintTo(
      provider.connection,
      platformAuth,
      platformMint,
      voterAta.address,
      platformAuth,
      5000);

    const VoterAtaBalance = await getTokenAccountBalance(provider.connection, voterAta.address);

    assert.equal(VoterAtaBalance, new String(5000), "Voter should have 500000 minted tokens");
  });

  it("Finds PDAs", async () => {
    config = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("funder-dao"),
        platformAuth.publicKey.toBuffer(),
        platformSeed.toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    )[0];

    voterStackedAta = anchor.web3.PublicKey.findProgramAddressSync(
      [
        voter.publicKey.toBuffer(),
        config.toBuffer(),
      ],
      program.programId
    )[0];

    votingState = anchor.web3.PublicKey.findProgramAddressSync(
      [
        config.toBuffer(),
        projectMaker.publicKey.toBuffer(),
        anchor.utils.bytes.utf8.encode(projectName),
      ],
      program.programId
    )[0];

    voterData = anchor.web3.PublicKey.findProgramAddressSync(
      [
        voterStackedAta.toBuffer(),
        config.toBuffer(),
      ],
      program.programId
    )[0];

    voterHistory = anchor.web3.PublicKey.findProgramAddressSync(
      [
        voterData.toBuffer(),
        votingState.toBuffer(),
      ],
      program.programId
    )[0];

    console.log(voterData.toString())

  });

  it("Is initialized!", async () => {

    const tx = await program.methods.initialize(platformSeed, daysToUnstake).accountsPartial({
      config: config,
      platformAuth: platformAuth.publicKey,
      platformMint: platformMint,
    })
      .signers([platformAuth])
      .rpc()
      .then(confirmTx)
      .catch((e) => console.error(e));
    console.log("Your transaction signature", tx);
    const configFetched = await program.account.config.fetch(config);
    assert.equal(platformAuth.publicKey.toString(), configFetched.platformAuth.toString(), "Authority of config should be equal to the signer",);
    assert.equal(platformMint.toString(), configFetched.platformMint.toString(), "Mint of config should be equal to the platformMint",);
    assert.equal((daysToUnstake.mul(new anchor.BN(86400))).toString(), configFetched.unstakingPeriod.toString(), "Unstaking period of config should be equal to the platformSeed",);
    assert.equal(platformSeed.toString(), configFetched.platformSeed.toString(), "Seed of config should be equal to the platformSeed",);
  });

  it("Project created!", async () => {

    const tx = await program.methods.createVoting(projectName, VotingEndTimestamp).accountsPartial({
      projectMaker: projectMaker.publicKey,
      config: config,
      votingState: votingState,
    })
      .signers([projectMaker])
      .rpc()
      .then(confirmTx)
      .catch((e) => console.error(e));
    console.log("Your transaction signature", tx);
    const votingStateFetched = await program.account.votingState.fetch(votingState);
    assert.equal(projectMaker.publicKey.toString(), votingStateFetched.projectMaker.toString(), "Maker of the voting should be equal to the projectMaker",);
    assert.equal(projectName, votingStateFetched.projectName, "Name of the projects should match",);
    assert.equal(VotingEndTimestamp.toString(), votingStateFetched.votingEnd.toString(), "End time of the voting should be equal to the passed argument",);

  });

  it("Staked!", async () => {

    const tx = await program.methods.stake(stakingAmount).accountsPartial({
      voter: voter.publicKey,
      config: config,
      platformMint: platformMint,
      voterAta: voterAta.address,
      voterStakedAta: voterStackedAta,
      voterData: voterData
    })
      .signers([voter])
      .rpc()
      .then(confirmTx)
      .catch((e) => console.error(e));
    console.log("Your transaction signature", tx);
    const voterDataFetched = await program.account.voterData.fetch(voterData);
    const voterStackedAtaBalance = await getTokenAccountBalance(provider.connection, voterStackedAta);
    assert.equal(voterStackedAtaBalance, stakingAmount.toString(), "Staked amount should be equal");
    assert.equal(voterDataFetched.votingPower.toString(), stakingAmount.toString(), "Staked amount and voting power should be equal");


  });

  it("Voted!", async () => {

    const tx = await program.methods.vote(idea_for, strategy_for, ask_for).accountsPartial({
      voter: voter.publicKey,
      config: config,
      votingState: votingState,
      voterStakedAta: voterStackedAta,
      voterData: voterData,
      voterHistory: voterHistory
    })
      .signers([voter])
      .rpc()
      .then(confirmTx)
      .catch((e) => console.error(e));
    const votingStateFetched = await program.account.votingState.fetch(votingState);
    const voterDataFetched = await program.account.voterData.fetch(voterData);
    assert.equal(votingStateFetched.ideaFor.toString(), voterDataFetched.votingPower.toString());
    assert.equal(votingStateFetched.strategyFor.toString(), voterDataFetched.votingPower.toString());
    assert.equal(votingStateFetched.askFor.toString(), voterDataFetched.votingPower.toString());

  });

  it("Voting Finished!", async () => {

    const tx = await program.methods.finishVoting().accountsPartial({
      caller: projectMaker.publicKey,
      config: config,
      votingState: votingState,
    })
      .signers([projectMaker])
      .rpc()
      .then(confirmTx)
      .catch((e) => console.error(e));
    const slot = await provider.connection.getSlot();
    const timestamp = await provider.connection.getBlockTime(slot);
    const votingStateFetched = await program.account.votingState.fetch(votingState);
    assert(votingStateFetched.votingEnd.toString() < timestamp.toString(), "Ending timestamp should be equal or less than current timestamp")
  });

  it("Unstaking Started!", async () => {

    const tx = await program.methods.startUnstaking(unStakingAmount).accountsPartial({
      voter: voter.publicKey,
      config: config,
      platformMint: platformMint,
      voterAta: voterAta.address,
      voterStakedAta: voterStackedAta,
      voterData: voterData
    })
      .signers([voter])
      .rpc()
      .then(confirmTx)
      .catch((e) => console.error(e));
    const voterDataFetched = await program.account.voterData.fetch(voterData);
    assert.equal(voterDataFetched.isUnstaking, true, "Unstaking process should've been started")
    assert.equal(voterDataFetched.unstakingAmount.toString(), unStakingAmount.toString(), "Unstaking amounts should be equal")
  });

  it("Unstaked!", async () => {
    const voterDataFetched = await program.account.voterData.fetch(voterData);
    const voterStackedAtaAmountBefore = await getTokenAccountBalance(provider.connection, voterStackedAta);
    const tx = await program.methods.unstake().accountsPartial({
      voter: voter.publicKey,
      config: config,
      platformMint: platformMint,
      voterAta: voterAta.address,
      voterStakedAta: voterStackedAta,
      voterData: voterData
    })
      .signers([voter])
      .rpc()
      .then(confirmTx)
      .catch((e) => {
        console.error(e);
        assert.equal(voterStackedAtaAmountBefore.toString(), '1400', "if failed, amounts should be equal");
      });
  });
});
