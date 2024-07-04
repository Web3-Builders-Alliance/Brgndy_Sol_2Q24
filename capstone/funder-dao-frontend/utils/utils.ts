import {
    Cluster,
    Connection,
    clusterApiUrl,
    Commitment,
} from "@solana/web3.js";

export const opts = {
    preflightCommitment: "processed" as Commitment,
};

export const connection = new Connection(
    clusterApiUrl(process.env.NEXT_PUBLIC_SOLANA as Cluster),
    "confirmed"
);
