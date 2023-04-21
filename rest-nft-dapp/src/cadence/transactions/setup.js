export const setup = `
import RestNFT from 0xee1b2deaf8067e95

// This transaction configures a user's account
// to use the NFT contract by creating a new empty collection,
// storing it in their account storage, and publishing a capability
transaction {
    prepare(acct: AuthAccount) {

        // Create a new empty collection
        let collection <- RestNFT.createEmptyCollection()

        // store the empty NFT Collection in account storage
        acct.save<@RestNFT.Collection>(<-collection, to: RestNFT.CollectionStoragePath)

        log("Collection created")

        // create a public capability for the Collection
        acct.link<&{RestNFT.NFTReceiver}>(RestNFT.CollectionPublicPath, target: RestNFT.CollectionStoragePath)

        log("Capability created")
    }
}
`