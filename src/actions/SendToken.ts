import { Keypair, PublicKey } from "@solana/web3.js";
import { conn, GetTokenDecimals } from "./lib";
import base58 from "bs58";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

export async function SendToken({
  MintAddress,
  SendFrom,
  FromSecretKey,
  SendTo,
  amount,
}: {
  SendTo: string;
  FromSecretKey: string;
  SendFrom: string;
  amount: number;
  MintAddress: string;
}) {
  const SendFromAccount = new PublicKey(SendFrom);
  const SendToAccount = new PublicKey(SendTo);
  const MintAccount = new PublicKey(MintAddress);
  const SecretKeyByteArray = base58.decode(FromSecretKey);
  const signer = Keypair.fromSecretKey(SecretKeyByteArray);
  const { Multiplier } = await GetTokenDecimals({ TokenMint: MintAddress });
  const SenderTokenAccount = await getOrCreateAssociatedTokenAccount(
    conn,
    signer,
    MintAccount,
    SendFromAccount
  );
  const ReceiverTokenAccount = await getOrCreateAssociatedTokenAccount(
    conn,
    signer,
    MintAccount,
    SendToAccount
  );

  const transactionSignature = await transfer(
    conn,
    signer,
    SenderTokenAccount.address,
    ReceiverTokenAccount.address,
    signer.publicKey,
    amount * Multiplier
  );
  return {
    txsignature: transactionSignature,
  };
}
