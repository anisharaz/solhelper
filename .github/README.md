# A VERY SIMPLE PACKAGE TO INTERACT WITH THE SOLANA BLOCKCHAIN
Under the hood the package uses the `@solana/web3.js`, `@solana/spl-token` package to interact with the Solana blockchain but it provides a simple abstraction to the user.

**For Example.**
```javascript
import {SendToken} from '@aaraz/solhelper'

SendToken({
    SendFrom: 'SendFrom',
    FromSecretKey: 'FromSecretKey',
    SendTo: 'SendTo',
    MintAddress: 'MintAddress',
    amount: 12,
})

SendSolana({
    FromPubKey: 'FromPublicKey',
    FromSecretKey: 'FromSecretKey',
    sol_amount: 0.5,
    ToPublicKey:  'ToPublicKey',
})
```
#### Note: By default the package use devnet. You can provide the rpc url by setting `solana_rpc_url` as environment variable