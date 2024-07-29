import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

export const conn = new Connection(
  process.env.solana_rpc_url || clusterApiUrl("devnet")
);

export async function GetTokenDecimals({ TokenMint }: { TokenMint: string }) {
  let mint = await conn.getParsedAccountInfo(new PublicKey(TokenMint));
  if (mint.value === null) {
    throw new Error("Token Mint not found");
  }
  return {
    // @ts-ignore
    decimals: mint.value?.data.parsed.info.decimals,
    // @ts-ignore
    Multiplier: Math.pow(10, mint.value?.data.parsed.info.decimals),
  };
}
