import ExampleNFT from "../contracts/my-token.cdc"

// Print the NFTs owned by accounts 0x01 and 0x02.
pub fun main(acct_addr: Address) {

    // Get both public account objects
    let account = getAccount(acct_addr)

    // Find the public Receiver capability for their Collections
    let acctCapability = account.getCapability(ExampleNFT.CollectionPublicPath)

    // borrow references from the capabilities
    let receiverRef = acctCapability.borrow<&{ExampleNFT.NFTReceiver}>()
        ?? panic("Could not borrow receiver reference")

    // Print collection as arrays of IDs
    log(receiverRef)
    log("Account NFTs")
    log(receiverRef.getIDs())
}