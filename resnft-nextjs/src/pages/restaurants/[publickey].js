import react, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { getData } from "../../cadence/scripts/getData.js";
import { useRouter } from "next/router";

function Restaurant() {
  const router = useRouter();
  const { publickey } = router.query;
  const addr = publickey;

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
}

export default Restaurant;
