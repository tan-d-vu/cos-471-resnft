import React from "react";
import * as fcl from "@onflow/fcl";
import { setup } from "../cadence/transactions/setup.js";
import MintNFT from "@/components/nfts/MintNFT.js";
import GetNFTByOwner from "@/components/nfts/GetNFTByOwner.js";
import { useAuthContext } from "@/contexts/AuthContext.js";
import Link from "next/link";

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
        <div className="Home-wrapper">
            <div className="Home-content">
                <section className="Home-sec">To get started register with us</section>
                <div className="Home-sec">Create new reservations
                    <br></br>
                    <button className="Gen-Button">
                        <Link href="/mint">CREATE</Link>
                    </button>
                </div>
                <div className="Home-sec">View existing reservations
                    <br></br>
                    <button className="Gen-Button">
                        <Link href="/mint">VIEW</Link>
                    </button>
                </div>
            </div>
                {/* <h2> Current Address : {user.addr} </h2> */}
                {/* <p> ----------------------</p>
                <button onClick={() => setupAccount()} className="Gen-Button">
                    {" "}
                    Setup{" "}
                </button>
                <p> ----------------------</p>
                <MintNFT />
                <p> ----------------------</p>
                <GetNFTByOwner addr={user.addr} />
                <p> ----------------------</p> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Index;
