import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { conn, GetTokenDecimals } from "./lib";

export async function SendTokenTransaction({
  SendFrom,
  SendTo,
  MintAddress,
  amount,
}: {
  SendTo: string;
  FromSecretKey: string;
  SendFrom: string;
  amount: number;
  MintAddress: string;
}): Promise<Transaction> {
  const mintToken = new PublicKey(MintAddress);
  const SendFromPub = new PublicKey(SendFrom);
  const recipientAddress = new PublicKey(SendTo);

  const transactionInstructions: TransactionInstruction[] = [];
  const associatedTokenFrom = await getAssociatedTokenAddress(
    mintToken,
    SendFromPub
  );
  const fromAccount = await getAccount(conn, associatedTokenFrom);
  const associatedTokenTo = await getAssociatedTokenAddress(
    mintToken,
    recipientAddress
  );
  if (!(await conn.getAccountInfo(associatedTokenTo))) {
    transactionInstructions.push(
      createAssociatedTokenAccountInstruction(
        SendFromPub,
        associatedTokenTo,
        recipientAddress,
        mintToken
      )
    );
  }
  const { Multiplier } = await GetTokenDecimals({ TokenMint: MintAddress });
  transactionInstructions.push(
    createTransferInstruction(
      fromAccount.address, // source
      associatedTokenTo, // dest
      SendFromPub,
      amount * Multiplier
    )
  );
  const transaction = new Transaction().add(...transactionInstructions);
  const blockHash = await conn.getLatestBlockhash();
  transaction.feePayer = SendFromPub;
  transaction.recentBlockhash = blockHash.blockhash;
  return transaction;
}
