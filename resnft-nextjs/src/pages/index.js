import React from "react";
import { useState } from "react";
import * as fcl from "@onflow/fcl";
import { setup } from "../cadence/transactions/setup.js";
import MintNFT from "@/components/MintNFT.js";
import GetNFTByID from "@/components/GetNFTByID.js";
import GetNFTByOwner from "@/components/GetNFTByOwner.js";
import { useAuthContext } from "@/contexts/AuthContext.js";

function Index() {
  const { user, setUser} = useAuthContext();

  const login = () => {
    fcl.authenticate();
    fcl.currentUser().subscribe(setUser);
  };

  const logout = () => {
    fcl.unauthenticate();
    setUser(null);
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
      {!user || !user.addr ? (
        <button onClick={login} className="Gen-Button">
          Login
        </button>
      ) : (
        ""
      )}

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
          <button onClick={logout} className="Gen-Button">
            Logout
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Index;
