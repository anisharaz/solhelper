# A VERY SIMPLE PACKAGE TO INTERACT WITH THE SOLANA BLOCKCHAIN
Under the hood the package uses the `@solana/web3.js`, `@solana/spl-token` package to interact with the Solana blockchain but it provides a simple abstraction to the user.



> [!IMPORTANT]
> By default the package use devnet.To use mainnet set env `solana_rpc_url` to RPC url 

# GetBalance()
```javascript
import {GetBalance} from '@aaraz/solhelper'

GetBalance({
    PubKey: 'Public_Key',
    unit: 'lamports' // or "sol"
})
```

# SendSolana()
```javascript
import {SendSolana} from '@aaraz/solhelper'

SendSolana({
    FromPubKey: 'FromPublicKey',
    FromSecretKey: 'FromSecretKey',
    sol_amount: 0.5,
    ToPublicKey:  'ToPublicKey',
})
```



# SendToken()
It directly send token from one account to another account
```javascript
import {SendToken} from '@aaraz/solhelper'

SendToken({
    SendFrom: 'SendFrom',
    FromSecretKey: 'FromSecretKey',
    SendTo: 'SendTo',
    MintAddress: 'MintAddress',
    amount: 12,
})
```
# SendTokenTransaction()
This function returns the token transfer transaction which is send to wallet to be signed by user.
```javascript
import {SendTokenTransaction} from '@aaraz/solhelper'

const TransferTransection =  SendTokenTransaction({
    SendFrom: 'FromPublicKey'
    SendTo: 'ToPublicKey'
    MintAddress: 'Token_mint_address',
    amount: 3
})

// use sendTransaction to send transection to wallet to be signed in solana wallet adapter
sendTransaction(TransferTransection) 
// other wallet adapter can have other methods to sendTransaction
```

# CreateNFT()

Use `readFileSync()` from fs package to read image file and pass the buffer to the function.<br>
Make sure you set `solana_rpc_url` environmnet variable before setting network to mainnet for better performance.

```javascript
import {CreateNFT} from '@aaraz/solhelper'

CreateNFT({
    ImageBuffer: ImageBuffer,
    ImageFileName: 'file_name_with_extension',
    Metadata: {
        name: 'NFT Name',
        symbol: 'NFT Symbol',
        description: 'NFT Description',
    },
    PrivateKEY: 'PrivateKEY',
    Network: 'devnet' // or 'mainnet',
    isMutable: false // or true
})

```

