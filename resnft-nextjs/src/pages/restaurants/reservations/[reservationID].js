import prisma from "../../../../prisma/lib/prisma";
import React, { useState } from "react";
import { DateTime } from "luxon";
import Modal from "react-modal";
import Link from "next/link";

const ShowReservationToBook = ({ reservation }) => {
  console.log(reservation);
  // keys {id, content, restaurantID, datetime, isAvailable, nft})
  return <>{reservation.id}</>;
};

export default ShowReservationToBook;

export async function getServerSideProps(context) {
  const reservationID = context.params.reservationID;

  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationID,
    },
  });

  console.log(reservation);

  return {
    props: { reservation: reservation },
  };
}
