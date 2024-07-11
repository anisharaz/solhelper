import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { conn } from "./lib";

export async function GetBalance(params: {
  PubKey: string;
  unit: "lamports" | "sol";
}) {
  if (!PublicKey.isOnCurve(params.PubKey)) {
    throw new Error("Invalid Public Key");
  }

  const balance = await conn.getBalance(new PublicKey(params.PubKey));
  if (params.unit === "sol") {
    return balance / LAMPORTS_PER_SOL;
  }
  return balance;
}
