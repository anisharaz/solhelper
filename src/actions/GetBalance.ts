import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { SolNetwork } from "../types/All";

export async function GetBalance(params: {
  PubKey: string;
  network: SolNetwork;
  unit: "lamports" | "sol";
}) {
  if (!PublicKey.isOnCurve(params.PubKey)) {
    throw new Error("Invalid Public Key");
  }
  const conn = new Connection(clusterApiUrl(params.network));
  const balance = await conn.getBalance(new PublicKey(params.PubKey));
  if (params.unit === "sol") {
    return balance / LAMPORTS_PER_SOL;
  }
  return balance;
}
