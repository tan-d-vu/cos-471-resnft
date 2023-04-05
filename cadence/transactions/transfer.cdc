import ExampleNFT from "../contracts/ExampleNFT.cdc"

// This transaction transfers an NFT from one user's collection
// to another user's collection.
transaction(to_addr: Address, withdrawID: UInt64) {

    // The field that will hold the NFT as it is being
    // transferred to the other account
    let transferToken: @ExampleNFT.NFT
    let from_addr: Address
    let to_addr: Address

    prepare(acct: AuthAccount) {
        self.from_addr = acct.address
        self.to_addr = to_addr


        // Borrow a reference from the stored collection
        let collectionRef = acct.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the owner's collection")

        // Call the withdraw function on the sender's Collection
        // to move the NFT out of the collection
        self.transferToken <- collectionRef.withdraw(withdrawID: withdrawID)
    }

    execute {
        // Get the recipient's public account object
        let recipient = getAccount(self.to_addr)

        // Get the Collection reference for the receiver
        // getting the public capability and borrowing a reference from it
        let receiverRef = recipient.getCapability<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath)
            .borrow()
            ?? panic("Could not borrow receiver reference")

        // Deposit the NFT in the receivers collection
        log(self.transferToken.id)
        receiverRef.deposit(token: <-self.transferToken)
        log(self.from_addr)
        log(self.to_addr)
    }
}