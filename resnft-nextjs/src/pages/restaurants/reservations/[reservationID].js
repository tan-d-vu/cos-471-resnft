import prisma from "../../../../prisma/lib/prisma";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { getSalePrice } from "@/utils/utils";
import { purchase } from "@/cadence/transactions/Purchase";
import * as fcl from "@onflow/fcl";

const ShowReservationToBook = ({ reservation }) => {
  const [salePrice, setSalePrice] = useState();
  const { user, _ } = useAuthContext();

  useEffect(() => {
    getSalePrice({
      addr: reservation.restaurantID,
      nftID: reservation.nft,
    }).then((price) => {
      setSalePrice(price);
    });
  }, []);

  // transaction(addr: Address, tokenID: UInt64, price: UFix64) {
  const makePurchase = async ({ addr, tokenID, price }) => {
    console.log(addr);
    console.log(tokenID);
    console.log(price);
    const authz = fcl.currentUser().authorization;
    return await fcl
      .send([
        fcl.transaction(purchase),
        fcl.args([
          fcl.arg(addr, fcl.t.Address),
          fcl.arg(tokenID, fcl.t.UInt64),
          fcl.arg(price, fcl.t.UFix64),
        ]),
        fcl.payer(authz),
        fcl.proposer(authz),
        fcl.authorizations([authz]),
        fcl.limit(9999),
      ])
      .then((res) => {
        console.log(fcl.decode(res));
        return fcl.tx(res).onceSealed();
      });
  };

  const handlePurchase = async () => {
    const buyerAddr = reservation.restaurantID;
    const tokenID = reservation.nft;

    await makePurchase({
      addr: reservation.restaurantID,
      tokenID: tokenID,
      price: salePrice,
    }).then((res) => {
      console.log(res);
    });
  };

  console.log(reservation);
  // keys {id, content, restaurantID, datetime, isAvailable, nft})
  return (
    <>
      {reservation.datetime}
      <br />
      {reservation.nft}
      <br />
      {reservation.content}
      <br />
      {reservation.restaurantID}
      <br />
      Price: {salePrice}
      <br />
      <>
        {reservation.isAvailable ? (
          <>
            {!user || !user.addr ? (
              <>Log in to book this reservation</>
            ) : (
              <>
                {user.addr != reservation.restaurantID ? (
                  <>
                    <button onClick={() => handlePurchase()}>Purchase</button>
                  </>
                ) : (
                  <>You own this reservation</>
                )}
              </>
            )}
          </>
        ) : (
          <>This reservation is not available</>
        )}
      </>
    </>
  );
};

export default ShowReservationToBook;

export async function getServerSideProps(context) {
  const reservationID = context.params.reservationID;

  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationID,
    },
  });

  return {
    props: { reservation: reservation },
  };
}
