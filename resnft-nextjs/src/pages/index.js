import React from "react";
import { useState } from "react";
import * as fcl from "@onflow/fcl";
import { setup } from "../cadence/transactions/setup.js";
import MintNFT from "@/components/MintNFT.js";
import GetNFTByID from "@/components/GetNFTByID.js";
import GetNFTByOwner from "@/components/GetNFTByOwner.js";

fcl
  .config()
  .put("app.detail.title", "NFT Dapp")
  .put("app.detail.icon", "https://i.imgur.com/9I6NRUm.png")
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");

function Index() {
  const [user, setUser] = useState();

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

  console.log(user);

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
          <MintNFT authz={fcl.authz} />
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
