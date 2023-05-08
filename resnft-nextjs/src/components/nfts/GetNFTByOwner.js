import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { getData } from "../../cadence/scripts/getData.js";
import { setReservationNFTs } from "@/utils/utils.js";

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

  useEffect(() => {
    console.log(nfts);
    if (nfts) {
      setReservationNFTs({ addr: addr, nfts: nfts }).then((data) => {
        if (data) {
          console.log(data);
        }
      });
    }
  }, [nfts]);

  return (
    <div>
      {nfts
        ? nfts.map((nft, index) => (
            <div key={index}>
              <div>ID: {nft.ID}</div>
              <div>{nft.Name}</div>
              <div>{nft.Data}</div>
              <div>{nft.Bond}</div>
              <div>{nft.Royalties}</div>
            </div>
          ))
        : ""}

      {nfts ? nfts.length : 0}
    </div>
  );
};

export default GetNFTByOwner;
