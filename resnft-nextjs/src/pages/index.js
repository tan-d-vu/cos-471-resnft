import React from "react";
import * as fcl from "@onflow/fcl";
import { setup } from "../cadence/transactions/setup.js";
import MintNFT from "@/components/nfts/MintNFT.js";
import GetNFTByOwner from "@/components/nfts/GetNFTByOwner.js";
import { useAuthContext } from "@/contexts/AuthContext.js";

function Index() {
  const { user, _ } = useAuthContext();

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
      {user && user.addr ? (
        <div>
          <h2> Current Address : {user.addr} </h2>
          <p> ----------------------</p>
          <button onClick={() => setupAccount()} className="Gen-Button">
            {" "}
            Setup{" "}
          </button>
          <p> ----------------------</p>
          <MintNFT />
          <p> ----------------------</p>
          <GetNFTByOwner addr={user.addr} />
          <p> ----------------------</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Index;
