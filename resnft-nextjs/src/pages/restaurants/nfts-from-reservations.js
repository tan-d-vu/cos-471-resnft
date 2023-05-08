import { createandsale } from "@/cadence/transactions/createandsale";
import { multimint } from "@/cadence/transactions/multimint";
import { useEffect, useState } from "react";
import { useAuthContext, useProfileContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import { useNewReservationsContext } from "@/contexts/CreateNewReservationsContext";

import * as fcl from "@onflow/fcl";

function transformArray(arr) {
  // Get all unique keys from the array of maps
  const keys = [...new Set(arr.flatMap((map) => Object.keys(map)))];

  // Map over the keys and create a new object for each key
  const result = keys.reduce((acc, key) => {
    acc[key] = arr.map((map) => map[key]);
    return acc;
  }, {});

  return result;
}

const NFTsFromReservations = () => {
  const router = useRouter();

  const { user, _ } = useAuthContext();

  const { reservationsCreated, setReservationsCreated } =
    useNewReservationsContext();

  const [mintBondArray, setMintBond] = useState();
  const [mintRoyaltiesArray, setMintRoyalties] = useState();
  const [priceArray, setSalePrice] = useState();

  const reservationsToMint = transformArray(reservationsCreated);

  const mintNameArray = reservationsToMint.id;
  const mintDataArray = reservationsToMint.content;

  function makeArray(elem, length) {
    return Array.from({ length }, () => elem);
  }

  console.log(mintNameArray);
  console.log(mintDataArray);
  console.log(mintBondArray);
  console.log(mintRoyaltiesArray);
  console.log(priceArray);

  const authz = fcl.currentUser().authorization;

  const mintAndCreateSale = async () => {
    await fcl
      .send([
        fcl.transaction(multimint),
        fcl.args([
          fcl.arg(mintDataArray, fcl.t.Array(fcl.t.String)),
          fcl.arg(mintBondArray, fcl.t.Array(fcl.t.UInt64)),
          fcl.arg(mintRoyaltiesArray, fcl.t.Array(fcl.t.UFix64)),
          fcl.arg(mintNameArray, fcl.t.Array(fcl.t.String)),
          // fcl.arg(mintBondArray, fcl.t.Array(fcl.t.UFix64)),
        ]),
        fcl.payer(authz),
        fcl.proposer(authz),
        fcl.authorizations([authz]),
        fcl.limit(9999),
      ])
      .then(fcl.decode)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        router.push(`/restaurants/allReservations/${encodeURIComponent(user.addr)}`);
      });
  };

  const handleMintBondChange = (e) => {
    const inputValue = parseInt(e.target.value);
    if (inputValue < 0) {
      alert("Mint Bond must be 0 or a positive whole number.");
    } else {
      // Cast to string
      let inputString = inputValue.toString();
      setMintBond(makeArray(inputString, mintNameArray.length));

      // Convert to uFix64 for price
      inputString = inputString.concat(".0");
      setSalePrice(makeArray(inputString, mintNameArray.length));
    }
  };

  const handleMintRoyaltiesChange = (e) => {
    const inputValue = parseFloat(e.target.value);
    if (inputValue < 0 || inputValue > 1) {
      alert("Mint Royalties must be between 0 and 1.");
    } else {
      let inputString = inputValue.toString();

      if (inputString.length == 1) {
        inputString = inputString.concat(".0");
      }

      setMintRoyalties(makeArray(inputString, mintNameArray.length));
    }
  };

  return (
    <div className="mint-and-create-sale">
      <h2> NFTs from Reservations </h2>
      reservationsCreated: {JSON.stringify(reservationsToMint)}
      <br />
      <div>
        <input
          type="number"
          step="1"
          placeholder="Set Mint Bond"
          onChange={(e) => handleMintBondChange(e)}
        />
        <input
          type="number"
          step="0.01"
          min="0"
          max="1"
          placeholder="Set Mint Royalties"
          onChange={handleMintRoyaltiesChange}
        />
        <button onClick={() => mintAndCreateSale()}>
          {" "}
          Mint NFTs and Create Sale{" "}
        </button>
      </div>
    </div>
  );
};

export default NFTsFromReservations;
