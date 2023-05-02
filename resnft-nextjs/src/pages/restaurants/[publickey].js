import react, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { getData } from "../../cadence/scripts/getData.js";
import { useRouter } from 'next/router'

fcl
  .config()
  .put("app.detail.title", "NFT Dapp")
  .put("app.detail.icon", "https://i.imgur.com/9I6NRUm.png")
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");

function Restaurant() {
  const [myNFT, setMyNFT] = useState();
  const router = useRouter()
  const { publickey } = router.query

  const GetMyNFT = async () => {
    const response = await fcl.send([
      fcl.script(getData),
      fcl.args([fcl.arg(publickey, fcl.t.Address)]),
    ]);
    const data = await fcl.decode(response);
    setMyNFT(data);
    console.log(data);
    console.log(myNFT);
    console.log(myNFT.type);
  };

  
  return (
    <div className="App">
      <p> ----------------------</p>
      <button onClick={() => GetMyNFT()}> Get NFT </button>
      <p> ----------------------</p>

      {myNFT
        ? myNFT.map((nft, index) => (
            <div key={index}>
              <img src={nft.Data} />
            </div>
          ))
        : ""}
      {myNFT ? myNFT.length : 0}
      <p> ----------------------</p>
    </div>
  );
}

export default Restaurant;
