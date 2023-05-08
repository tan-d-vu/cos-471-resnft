export const createandsale = `


// CreateSale.cdc

import FlowToken from 0x7e60df042a9c0868
import FungibleToken from 0x9a0766d93b6608b7
import RestNFT from 0x18bdaac138c4e23f
import Marketplace from 0x5b0d2b644cfa424e

transaction(mintDataArray: [String], mintBondArray: [UInt64], mintRoyaltiesArray: [UFix64], mintNameArray: [String], prices: [UFix64]) {

    // The reference to the collection that will be receiving the NFTs
    let receiverRef: &{RestNFT.NFTReceiver}
    var creatorAddress: Address

    prepare(acct: AuthAccount) {
        // Get the owner's collection capability and borrow a reference
        self.receiverRef = acct.getCapability<&{RestNFT.NFTReceiver}>(RestNFT.CollectionPublicPath)
            .borrow() ?? panic("Could not borrow receiver reference")
        self.creatorAddress = acct.address
        // Ensure that the arrays are of equal length
        if mintDataArray.length != mintBondArray.length || mintDataArray.length != mintRoyaltiesArray.length || mintDataArray.length != mintNameArray.length {
            panic("Input arrays must be of equal length")
        }
        var i = 0
        var tokenIDs: [UInt64] = []
        // Iterate through the arrays and mint NFTs
        while (i < mintDataArray.length) {
            let newNFT <- RestNFT.mintNFT(mintData: mintDataArray[i], mintCreator: self.creatorAddress, 
                bond: mintBondArray[i], mintRoyalties: mintRoyaltiesArray[i], mintName: mintNameArray[i])
            tokenIDs.append(newNFT.id)
            self.receiverRef.deposit(token: <- newNFT)
            i = i + 1
        }

        // Borrow a reference to the stored Vault
        let receiver = acct.getCapability<&FlowToken.Vault{FlowToken.Receiver}>(/public/flowTokenReceiver)


        // borrow a reference to the nftTutorialCollection in storage
        let collectionCapability = acct.link<&RestNFT.Collection>(/private/nftTutorialCollection, target: RestNFT.CollectionStoragePath)
          ?? panic("Unable to create private link to NFT Collection")

        // Create a new Sale object,
        // initializing it with the reference to the owner's vault
        let sale <- Marketplace.createSaleCollection(ownerCollection: collectionCapability, ownerVault: receiver)

        i = 0

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