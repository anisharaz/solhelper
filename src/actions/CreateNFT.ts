import {
  irysStorage,
  keypairIdentity,
  Metaplex,
  toMetaplexFile,
} from "@metaplex-foundation/js";
import bs58 from "bs58";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { NetworkName } from "../types/all";

export async function CreateNFT({
  ImageBuffer,
  ImageFileName,
  Metadata,
  PrivateKEY,
  Network,
  isMutable,
}: {
  ImageBuffer: Buffer;
  Metadata: {
    name: string;
    symbol: string;
    description: string;
  };
  Network: NetworkName;
  PrivateKEY: string;
  ImageFileName: string;
  isMutable: boolean;
}) {
  const user = Keypair.fromSecretKey(bs58.decode(PrivateKEY));
  const metaplex = Metaplex.make(
    new Connection(
      Network === "mainnet"
        ? (process.env.solana_rpc_url as string) ||
          clusterApiUrl("mainnet-beta")
        : clusterApiUrl("devnet")
    )
  )
    .use(keypairIdentity(user))
    .use(
      irysStorage({
        address:
          Network === "mainnet"
            ? "https://arweave.mainnet.irys.xyz"
            : "https://arweave.devnet.irys.xyz",
        providerUrl:
          Network === "mainnet"
            ? "https://api.mainnet-beta.solana.com/"
            : "https://api.devnet.solana.com",
        timeout: 60000,
      })
    );

  const file = toMetaplexFile(ImageBuffer, ImageFileName);

  const imageUri = await metaplex.storage().upload(file);

  // upload metadata and get metadata uri (off chain metadata)
  const uploadMetadataOutput = await metaplex.nfts().uploadMetadata({
    name: Metadata.name,
    symbol: Metadata.symbol,
    description: Metadata.description,
    image: imageUri,
  });
  const metadataUri = uploadMetadataOutput.uri;
  const { nft } = await metaplex.nfts().create(
    {
      uri: metadataUri, // metadata URI
      name: Metadata.name,
      sellerFeeBasisPoints: 0,
      symbol: Metadata.symbol,
      isMutable: isMutable,
      isCollection: true,
    },
    { commitment: "finalized" }
  );
  return nft;
}
