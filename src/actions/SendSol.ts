import {
  Transaction,
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  sendAndConfirmTransaction,
  Keypair,
} from "@solana/web3.js";
import bs58 from "bs58";

export async function SendSolana(params: {
  FromPubKey: string;
  FromSecKey: string;
  sol_amount: number;
  ToPubKey: string;
}) {
  if (
    !PublicKey.isOnCurve(params.FromPubKey) ||
    !PublicKey.isOnCurve(params.ToPubKey) ||
    Keypair.fromSecretKey(
      bs58.decode(params.FromSecKey)
    ).publicKey.toString() !== params.FromPubKey
  ) {
    throw new Error("Invalid Keys,Check Again");
  } else if (params.FromPubKey === params.ToPubKey) {
    throw new Error("Sender and Receiver Public Key is Same");
  }
  const conn = new Connection(
    process.env.solana_rpc_url || clusterApiUrl("devnet")
  );
  const trans = new Transaction();
  const PubSender = new PublicKey(params.FromPubKey);
  const PubReceiver = new PublicKey(params.ToPubKey);
  const tranData = SystemProgram.transfer({
    fromPubkey: PubSender,
    toPubkey: PubReceiver,
    lamports: LAMPORTS_PER_SOL * params.sol_amount,
  });
  trans.add(tranData);
  const SecretKeyByteArray = bs58.decode(params.FromSecKey);
  const transection_hash = await sendAndConfirmTransaction(conn, trans, [
    {
      publicKey: PubSender,
      secretKey: Uint8Array.from(SecretKeyByteArray),
    },
  ]);
  return transection_hash;
}
