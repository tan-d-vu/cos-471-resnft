import "./App.css";
import react, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { getData } from "./cadence/scripts/getData.js";
import { setup } from "./cadence/transactions/setup.js";
import { mint } from "./cadence/transactions/mint.js";

fcl
  .config()
  .put("app.detail.title", "NFT Dapp")
  .put("app.detail.icon", "https://i.imgur.com/9I6NRUm.png")
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");

function App() {
  const [user, setUser] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [myNFT, setMyNFT] = useState();
  const [mintBond, setMintBond] = useState(0);
  const [mintRoyalties, setMintRoyalties] = useState(0);
  const [mintName, setMintName] = useState("");
  const [mintData, setMintData] = useState("");

  const login = () => {
    fcl.authenticate();
    fcl.currentUser().subscribe(setUser);
  };

  const logout = () => {
    fcl.unauthenticate();
    setUser(null);
  };

  const GetMyNFT = async () => {
    const response = await fcl.send([
      fcl.script(getData),
      fcl.args([fcl.arg(user.addr, fcl.t.Address)]),
    ]);
    const data = await fcl.decode(response);
    setMyNFT(data);
    console.log(data);
    console.log(myNFT);
    console.log(myNFT.type);
  };

  const mintNFT = async () => {
    const transactionID = await fcl
      .send([
        fcl.transaction(mint),
        fcl.args([
          fcl.arg(mintData, fcl.t.String),
          fcl.arg(mintBond, fcl.t.UInt64),
          fcl.arg(mintRoyalties, fcl.t.UFix64),
          fcl.arg(mintName, fcl.t.String),
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999),
      ])
      .then(fcl.decode);

    console.log(transactionID);
  };

  const setupAccount = async () => {
    const transactionID = await fcl
      .send([
        fcl.transaction(setup),
        fcl.args(),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999),
      ])
      .then(fcl.decode);
    console.log(transactionID);
  };

  return (
    <div className="App">
      <h1> Flow NFT </h1>
      <h2> Current Address : {user && user.addr ? user.addr : ""} </h2>
      <button onClick={login}> Login </button>
      <p> ----------------------</p>

      <button onClick={() => setupAccount()}> Setup </button>
      <p> ----------------------</p>
      <input
        type="text"
        placeholder="Enter Name for NFT"
        value={mintName}
        onChange={(e) => setMintName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Data for NFT"
        value={mintData}
        onChange={(e) => setMintData(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Bond for NFT"
        value={mintBond}
        onChange={(e) => setMintBond(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Royalties for NFT"
        value={mintRoyalties}
        onChange={(e) => setMintRoyalties(e.target.value)}
      />

      <br />
      <button onClick={() => mintNFT()}> Create NFT </button>

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

export default App;
