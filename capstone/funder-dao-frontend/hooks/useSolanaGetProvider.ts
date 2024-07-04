import { AnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";
import { connection, opts } from "../utils/utils";

interface SolanaProviderData {
    provider: AnchorProvider;
    connection: Connection;
}

export const useSolanaGetProvider = (): SolanaProviderData => {
    const buyerWallet = useWallet();
    const provider = new AnchorProvider(connection, buyerWallet as any, opts);

    return {
        provider,
        connection,
    };
};