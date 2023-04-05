import ExampleNFT from "../contracts/my-token.cdc"

// This transaction allows the Minter account to mint an NFT
// and deposit it into its collection.

transaction(name: String, description: String) {

    // The reference to the collection that will be receiving the NFT
    let receiverRef: &{ExampleNFT.NFTReceiver}
    let acct_addr: Address

    prepare(acct: AuthAccount) {
        self.acct_addr = acct.address

        // Get the owner's collection capability and borrow a reference
        self.receiverRef = acct.getCapability<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath)
            .borrow()
            ?? panic("Could not borrow receiver reference")
    }

    execute {
        // Use the minter reference to mint an NFT, which deposits
        // the NFT into the collection that is sent as a parameter.
        let newNFT <- ExampleNFT.mintNFT(name: name, description: description)

        log("NFT Minted and deposited to Collection.")
        log("Account: ")
        log(self.acct_addr)
        log("NFT ID:")
        log(newNFT.id)
        self.receiverRef.deposit(token: <-newNFT)
    }
}