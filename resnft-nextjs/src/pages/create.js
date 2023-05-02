import React from 'react';
import react, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { mint } from "../cadence/transactions/mint.js";
  
const Create = () => {
  const [mintBond, setMintBond] = useState(0);
  const [mintRoyalties, setMintRoyalties] = useState(0);
  const [mintName, setMintName] = useState("");
  const [mintData, setMintData] = useState("");

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

  return (
    <div class="App">
      <h1>Create NFT</h1>
      <input
        type="text"
        class="CreateInput"
        placeholder="Enter Name for NFT"
        value={mintName}
        onChange={(e) => setMintName(e.target.value)}
      />
      <input
        type="text"
        class="CreateInput"
        placeholder="Enter Data for NFT"
        value={mintData}
        onChange={(e) => setMintData(e.target.value)}
      />
      <input
        type="text"
        class="CreateInput"
        placeholder="Enter Bond for NFT"
        value={mintBond}
        onChange={(e) => setMintBond(e.target.value)}
      />
      <input
        type="text"
        class="CreateInput"
        placeholder="Enter Royalties for NFT"
        value={mintRoyalties}
        onChange={(e) => setMintRoyalties(e.target.value)}
      />

      <br/>
      <button onClick={() => mintNFT()} className="Create-Button"> Create NFT </button>
    </div>
  );
};
  
export default Create;