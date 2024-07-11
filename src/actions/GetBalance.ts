import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export async function GetBalance(params: {
  PubKey: string;
  unit: "lamports" | "sol";
}) {
  if (!PublicKey.isOnCurve(params.PubKey)) {
    throw new Error("Invalid Public Key");
  }
  const conn = new Connection(
    process.env.solana_rpc_url || clusterApiUrl("devnet")
  );
  const balance = await conn.getBalance(new PublicKey(params.PubKey));
  if (params.unit === "sol") {
    return balance / LAMPORTS_PER_SOL;
  }
  return balance;
}
