import React from "react";
import * as fcl from "@onflow/fcl";
import { setup } from "../cadence/transactions/setup.js";
import MintNFT from "@/components/nfts/MintNFT.js";
import GetNFTByOwner from "@/components/nfts/GetNFTByOwner.js";
import { useAuthContext } from "@/contexts/AuthContext.js";
import Link from "next/link";

function Index() {
  const { user, _ } = useAuthContext();
  return (
    <div className="App">
      {user && user.addr ? (
        <div className="Home-wrapper">
          <div className="Home-content">
            <section className="Home-sec">
              To get started register with us
            </section>
            <div className="Home-sec">
              Create new reservations
              <br></br>
              <button className="Gen-Button">
                <Link href="/mint">CREATE</Link>
              </button>
            </div>
            <div className="Home-sec">
              View existing reservations
              <br></br>
              <button className="Gen-Button">
                <Link href="/mint">VIEW</Link>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button className="Landing-Button">
          <Link href="/login">Login</Link>
        </button>
      )}
    </div>
  );
}

export default Index;
