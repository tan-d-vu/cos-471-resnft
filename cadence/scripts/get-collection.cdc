import ExampleNFT from "../contracts/ExampleNFT.cdc"

pub fun main(acct_addr: Address) {
    // Get both public account objects
    let account = getAccount(acct_addr)

    // Find the public Receiver capability for their Collections
    let acctCapability = account.getCapability(ExampleNFT.CollectionPublicPath)

    // borrow references from the capabilities
    let receiverRef = acctCapability.borrow<&{ExampleNFT.NFTReceiver}>()
        ?? panic("Could not borrow receiver reference")

    // Print collection as arrays of IDs
    log("Account NFTs:")
    log(receiverRef.getIDs())
}

