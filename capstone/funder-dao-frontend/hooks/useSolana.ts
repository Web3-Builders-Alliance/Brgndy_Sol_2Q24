import { PublicKey, PublicKeyData, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { Program, web3, BN } from "@coral-xyz/anchor";
import { Dispatch, SetStateAction } from "react";
import { FunderDao } from "../types/funder_dao";
import { useSolanaGetProvider } from "./useSolanaGetProvider";
import { addDaysToTimestamp } from "../utils/addDaysToTimestamp";
import * as anchor from "@coral-xyz/anchor";
import idl from "../types/funder_dao.json";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";

export const useSolana = () => {
  const { SystemProgram, LAMPORTS_PER_SOL } = web3;
  const getProvider = useSolanaGetProvider();
  const program = new Program(idl as FunderDao, getProvider.provider);
  const projectName = "test3"
  const platformAuth = new web3.PublicKey(process.env.NEXT_PUBLIC_PLATFORM_AUTH as string);
  const projectMaker = new web3.PublicKey(process.env.NEXT_PUBLIC_PROJECT_MAKER as string);
  const voter = new web3.PublicKey(process.env.NEXT_PUBLIC_VOTER as string);

  const platformMint = new web3.PublicKey(
    process.env.NEXT_PUBLIC_PLATFORM_MINT as string
  );
  const platformSeed = new anchor.BN("125556");

  const config = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("funder-dao"),
      platformAuth.toBuffer(),
      platformSeed.toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  )[0];

  const voterStackedAta = anchor.web3.PublicKey.findProgramAddressSync(
    [
      voter.toBuffer(),
      config.toBuffer(),
    ],
    program.programId
  )[0];

  const voterData = anchor.web3.PublicKey.findProgramAddressSync(
    [
      voterStackedAta.toBuffer(),
      config.toBuffer(),
    ],
    program.programId
  )[0];

  const initialize = async (
    daysToUnstake: string,
  ) => {

    try {
      await program.methods.initialize(platformSeed, new anchor.BN(daysToUnstake))
        .accountsPartial({
          config: config,
          platformAuth: platformAuth,
          platformMint: platformMint,
        })
        .rpc();

    } catch (error) {
      console.log(error)
    }
  };

  const staking = async (
    stakingAmount: string,
  ) => {
    const provider = await getProvider;
    const { wallet } = provider.provider;
    const stakingAmountResult = +stakingAmount * 1_000_000;
    const voterAta = await getAssociatedTokenAddress(platformMint, voter);

    try {
      await program.methods.stake(new anchor.BN(stakingAmountResult))
        .accountsPartial({
          voter: voter,
          config: config,
          platformMint: platformMint,
          voterAta: voterAta,
          voterStakedAta: voterStackedAta,
          voterData: voterData
        })
        .rpc();

    } catch (error) {
      console.log(error)
    }

    const voterDataFetched = await program.account.voterData.fetch(voterData);
    console.log("VOTInG", voterDataFetched.votingPower.toString());
    //alert("Voting power is", voterDataFetched.votingPower.toString())


  };
  const createVoting = async (
    projectName: string,
  ) => {
    const provider = await getProvider;
    const slot = await provider.connection.getSlot();
    const timestamp = await provider.connection.getBlockTime(slot)
    const endingTimestamp = timestamp!! + 30 * 86400;

    const votingState = anchor.web3.PublicKey.findProgramAddressSync(
      [
        config.toBuffer(),
        projectMaker.toBuffer(),
        anchor.utils.bytes.utf8.encode(projectName),
      ],
      program.programId
    )[0];

    try {
      await program.methods.createVoting(projectName, new anchor.BN(endingTimestamp))
        .accountsPartial({
          projectMaker,
          config,
          votingState,
        })
        .rpc();

    } catch (error) {
      console.log(error)
    }

    const votingStateFetched = await program.account.votingState.fetch(votingState);
    console.log("StartTime", votingStateFetched.projectName.toString());
    console.log("StartTime", votingStateFetched.votingStart.toString());
    console.log("EndingTime", votingStateFetched.votingEnd.toString());

  };
  const vote = async (ideaFor: boolean, askFor: boolean, strategyFor: boolean
  ) => {
    const provider = await getProvider;
    const slot = await provider.connection.getSlot();
    const timestamp = await provider.connection.getBlockTime(slot)
    const endingTimestamp = timestamp!! + 30 * 86400;


    const votingState = anchor.web3.PublicKey.findProgramAddressSync(
      [
        config.toBuffer(),
        projectMaker.toBuffer(),
        anchor.utils.bytes.utf8.encode("testname1"),
      ],
      program.programId
    )[0];

    const voterHistory = anchor.web3.PublicKey.findProgramAddressSync(
      [
        voterData.toBuffer(),
        votingState.toBuffer(),
      ],
      program.programId
    )[0];

    try {
      await program.methods.vote(ideaFor, askFor, strategyFor)
        .accountsPartial({
          voter,
          config: config,
          votingState: votingState,
          voterStakedAta: voterStackedAta,
          voterData: voterData,
          voterHistory,
        })
        .rpc();

    } catch (error) {
      console.log(error)
    }

    const votingStateFetched = await program.account.votingState.fetch(votingState);
    console.log("StartTime", votingStateFetched.projectName.toString());
    console.log("StartTime", votingStateFetched.votingStart.toString());
    console.log("EndingTime", votingStateFetched.votingEnd.toString());

  };

  const startUnstaking = async (unstakingAmount: string) => {

    const provider = await getProvider;
    const slot = await provider.connection.getSlot();
    const timestamp = await provider.connection.getBlockTime(slot)
    const voterAta = await getAssociatedTokenAddress(platformMint, voter);

    try {
      await program.methods.startUnstaking(new anchor.BN(+unstakingAmount * 1_000_000))
        .accountsPartial({
          voter,
          config,
          platformMint,
          voterAta: voterAta,
          voterStakedAta: voterStackedAta,
          voterData: voterData
        })
        .rpc();

    } catch (error) {
      console.log(error)
    }
  };
  return { initialize, staking, createVoting, vote, startUnstaking };
};



