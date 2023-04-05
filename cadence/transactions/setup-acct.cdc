import ExampleNFT from "../contracts/ExampleNFT.cdc"

// This transaction configures a user's account
// to use the NFT contract by creating a new empty collection,
// storing it in their account storage, and publishing a capability
transaction {
    prepare(acct: AuthAccount) {
        if acct.getCapability<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath).borrow() == nil {

            // Create a new empty collection
            let collection <- ExampleNFT.createEmptyCollection()

            // store the empty NFT Collection in account storage
            acct.save<@ExampleNFT.Collection>(<-collection, to: ExampleNFT.CollectionStoragePath)

            log("Collection created for account:")
            log(acct.address.toString())

            // create a public capability for the Collection
            acct.link<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)

            log("Capability created")
        }
        else {
            log("Collection already exists for account:")
            log(acct.address.toString())
        }
    }
}