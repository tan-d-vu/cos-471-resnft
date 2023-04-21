export const getData = `

import RestNFT from 0xee1b2deaf8067e95

// Print the NFTs owned by account 0x01.
pub fun main(accountAddress: Address): [{String: String}] {
    let nftOwner = getAccount(accountAddress)

    // Find the public Receiver capability for their Collection
    let capability = nftOwner.getCapability<&{RestNFT.NFTReceiver}>(RestNFT.CollectionPublicPath)

    // borrow a reference from the capability
    let receiverRef = capability.borrow()
            ?? panic("Could not borrow receiver reference")

    // Log the NFTs that they own as an array of IDs
    return receiverRef.getAllData()
}

`