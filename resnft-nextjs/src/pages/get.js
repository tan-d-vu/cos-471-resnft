import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { getData } from "../cadence/scripts/getData.js";
import { setup } from "../cadence/transactions/setup.js";
import { mint } from "../cadence/transactions/mint.js";

const Get = () => {
    const [user, setUser] = useState();
    const [totalSupply, setTotalSupply] = useState();
    const [myNFT, setMyNFT] = useState();
    const [mintBond, setMintBond] = useState(0);
    const [mintRoyalties, setMintRoyalties] = useState(0);
    const [mintName, setMintName] = useState("");
    const [mintData, setMintData] = useState("");

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
    };
    return(
        <div class="App">
            <h1>Get</h1>
            <input
                type="text"
                class="CreateInput"
                placeholder="Enter ID of NFT"
                
            />
            <button onClick={() => GetMyNFT()} className="Gen-Button"> Get NFT </button>
        </div>
    );
};

export default Get;