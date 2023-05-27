import prisma from "../../../../prisma/lib/prisma";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { getSalePrice } from "@/utils/utils";
import { purchase } from "@/cadence/transactions/Purchase";
import { DateTime } from "luxon";
import * as fcl from "@onflow/fcl";
import { ConfirmationCheckbox } from "@/components/Form";

const RestaurantIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        fill="currentColor"
        d="M0 192c0-35.3 28.7-64 64-64c.5 0 1.1 0 1.6 0C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64c.5 0 1.1 0 1.6 0c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z"
      />
    </svg>
  );
};

const CalendarIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        fill="currentColor"
        d="M160 0c13.3 0 24 10.7 24 24V64H328V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V192 144 128c0-35.3 28.7-64 64-64h40V24c0-13.3 10.7-24 24-24zM432 192H80V448c0 8.8 7.2 16 16 16H416c8.8 0 16-7.2 16-16V192zM328 352H184c-13.3 0-24-10.7-24-24s10.7-24 24-24H328c13.3 0 24 10.7 24 24s-10.7 24-24 24z"
      />
    </svg>
  );
};

const ClockIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        fill="currentColor"
        d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
      />
    </svg>
  );
};

const ShowReservationToBook = ({ reservation, restaurant }) => {
  const [salePrice, setSalePrice] = useState();
  const { user, _ } = useAuthContext();
  const [confirmBooking, setConfirm] = useState(false);

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
    await makePurchase({
      addr: reservation.restaurantID,
      tokenID: reservation.nft,
      price: salePrice,
    }).then((res) => {
      console.log(res);
    });
  };

  console.log(reservation);
  // keys {id, content, restaurantID, datetime, isAvailable, nft})
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col self-center w-[40%] min-w-max rounded-lg p-5 pb-3 shadow-xl">
        <div className="text-base font-medium mb-3">
          <p>You are almost done!</p>
        </div>

        <div className="flex">
          <div className="flex">
            <RestaurantIcon className="flex h-20 w-20 text-green" />
          </div>
          <div className="flex flex-col justify-center justify-items-center grow pl-3">
            <div className="flex flex-col justify-end grow text-xl font-medium">
              {restaurant.name}
            </div>
            <div className="flex items-end grow">
              <p>
                <CalendarIcon className="h-5 inline-block mb-1 mr-1" />
                {DateTime.fromISO(reservation.datetime).toLocaleString(
                  DateTime.DATE_MED_WITH_WEEKDAY
                )}
              </p>
              <p className="ml-3">
                <ClockIcon className="h-5 inline-block mb-1 mr-1" />
                {DateTime.fromISO(reservation.datetime).toLocaleString(
                  DateTime.TIME_24_SIMPLE
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-5">
          <p>Reservation NFT ID: {reservation.nft}</p>
          <p className="whitespace-pre">
            Additional Information:
            <br />
            {reservation.content}
          </p>
          <p className="mt-5 text-lg">Required Deposit: ${salePrice}</p>
          <>
            {reservation.isAvailable ? (
              <>
                {!user || !user.addr ? (
                  <>Log in to book this reservation</>
                ) : (
                  <>
                    {user.addr != reservation.restaurantID ? (
                      <>
                        <ConfirmationCheckbox
                          checked={confirmBooking}
                          onChange={(e) => setConfirm(e.target.checked)}
                          text="Confirm making deposit and booking reservation."
                        />

                        <button
                          className="px-4 py-2 mt-3 shadow-xl text-white rounded-lg bg-green hover:bg-dark-green"
                          onClick={() => handlePurchase()}
                        >
                          Complete Reservation
                        </button>
                      </>
                    ) : (
                      <p className="mt-5">You own this reservation.</p>
                    )}
                  </>
                )}
              </>
            ) : (
              <>This reservation is not available</>
            )}
          </>
        </div>
      </div>
    </div>
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

  const restaurant = await prisma.user.findUnique({
    where: {
      pubKey: reservation.restaurantID,
    },
  });

  return {
    props: { reservation: reservation, restaurant: restaurant },
  };
}
