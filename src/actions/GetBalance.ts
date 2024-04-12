import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { SolNetwork } from "../types/All";

export async function GetBalance(params: {
  PubKey: string;
  network: SolNetwork;
}) {
  if (!PublicKey.isOnCurve(params.PubKey)) {
    throw new Error("Invalid Public Key");
  }
  const conn = new Connection(clusterApiUrl(params.network));
  const balance = await conn.getBalance(new PublicKey(params.PubKey));
  return balance;
}
