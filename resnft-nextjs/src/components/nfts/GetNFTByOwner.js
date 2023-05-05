import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { getData } from "../../cadence/scripts/getData.js";

// Placeholder rn. Not actually getting NFTs by ID
const GetNFTByOwner = ({ addr }) => {
  const [nfts, setNfts] = useState(null);

  useEffect(() => {
    const fetchNFT = async ({ addr }) => {
      const response = await fcl.send([
        fcl.script(getData),
        fcl.args([fcl.arg(addr, fcl.t.Address)]),
      ]);
      const data = await fcl.decode(response);
      setNfts(data);
    };
    if (addr) {
      fetchNFT({ addr });
    }
  }, [addr]);

  return (
    <div>
      {nfts
        ? nfts.map((nft, index) => (
            <div key={index}>
              <img src={nft.Data} />
            </div>
          ))
        : ""}

      {nfts ? nfts.length : 0}
    </div>
  );
};

export default GetNFTByOwner;
