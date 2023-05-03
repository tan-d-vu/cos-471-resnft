import GetNFTByOwner from "@/components/GetNFTByOwner.js";
import { useAuthContext } from "@/contexts/AuthContext.js";
import * as fcl from "@onflow/fcl";
import { getData } from "../cadence/scripts/getData.js";
import { useEffect, useState } from "react";

export const Get = () => {
  const { user, _ } = useAuthContext();

  const addr = user.addr;

  const [nfts, setNfts] = useState(null);

  useEffect(() => {
    const fetchNFT = async () => {
      const response = await fcl.send([
        fcl.script(getData),
        fcl.args([fcl.arg(addr, fcl.t.Address)]),
      ]);
      const data = await fcl.decode(response);
      setNfts(data);
    };
    fetchNFT();
  }, []);

  console.log(nfts);

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

export default Get;
