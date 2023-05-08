export const createSales = `

// CreateSale.cdc

import FlowToken from 0x7e60df042a9c0868
import FungibleToken from 0x9a0766d93b6608b7
import RestNFT from 0x18bdaac138c4e23f
import Marketplace from 0x5b0d2b644cfa424e

// This transaction creates a new Sale Collection object,
// lists an NFT for sale, puts it in account storage,
// and creates a public capability to the sale so that others can buy the token.
transaction(tokenIDs: [UInt64], prices: [UFix64]) {

    prepare(acct: AuthAccount) {

        // Borrow a reference to the stored Vault
        let receiver = acct.getCapability<&FlowToken.Vault{FlowToken.Receiver}>(/public/flowTokenReceiver)


        // borrow a reference to the nftTutorialCollection in storage
        let collectionCapability = acct.link<&RestNFT.Collection>(/private/nftTutorialCollection, target: RestNFT.CollectionStoragePath)
          ?? panic("Unable to create private link to NFT Collection")

        // Create a new Sale object,
        // initializing it with the reference to the owner's vault
        let sale <- Marketplace.createSaleCollection(ownerCollection: collectionCapability, ownerVault: receiver)

        var i = 0

        while i < tokenIDs.length {
        // List the token for sale by moving it into the sale object
            sale.listForSale(tokenID: tokenIDs[i], price: prices[i])
            i = i + 1
        }
        // Store the sale object in the account storage
        acct.save(<-sale, to: /storage/NFTSale)

        // Create a public capability to the sale so that others can call its methods
        acct.link<&Marketplace.SaleCollection{Marketplace.SalePublic}>(/public/NFTSale, target: /storage/NFTSale)
    }
}

`