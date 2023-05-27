import prisma from "../../../../prisma/lib/prisma";
import React, { useState } from "react";
import { DateTime } from "luxon";
import { ReservationModal } from "@/components/ReservationModal";
import { InputDatetime } from "@/components/Form";

const UserProfile = ({ reservations, restaurant }) => {
  const [searchDate, setSearchDate] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const handleDateChange = (event) => {
    setSearchDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSearchTime(event.target.value);
  };

  const updateAvailableTimeSlots = () => {
    let selectedTime = new Date(`${searchDate}T${searchTime}:00`);
    selectedTime = DateTime.fromJSDate(selectedTime);

    // Filter reservations to find available time slots for selected date and time
    const availableSlots = reservations.filter((reservation) => {
      const reservationDateTime = DateTime.fromISO(reservation.datetime);
      if (selectedTime.hasSame(reservationDateTime, "day")) {
        return reservationDateTime >= selectedTime;
      }
    });

    const reservationByDate = availableSlots.reduce((acc, obj) => {
      const date = obj.datetime.split("T")[0];
      acc[date] = acc[date] || [];
      acc[date].push(obj);
      return acc;
    }, {});

    console.log(reservationByDate);

    setAvailableTimeSlots(reservationByDate);
  };

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="self-center max-w-lg text-center pt-6 pb-6">
        <h1 className="text-3xl">Search Reservations</h1>
        <h2 className="text-2xl pt-2">{restaurant.name}</h2>
      </div>

      <div className="min-w-40 rounded-lg p-5 shadow-md">
        <div class id="reservation-search-form">
          <InputDatetime
            type="date"
            id="date"
            label="Date: "
            min={DateTime.now().toISODate()}
            value={searchDate}
            onChange={handleDateChange}
          />
          <InputDatetime
            type="time"
            id="time"
            label="Time: "
            value={searchTime}
            onChange={handleTimeChange}
          />
          <div className="text-center">
            <button
              type="submit"
              className="py-2 w-full mt-3 rounded-lg bg-light-green hover:bg-dark-green"
              onClick={updateAvailableTimeSlots}
            >
              Find A Time
            </button>
          </div>
        </div>

        <div className="mt-5" id="reservation-search-results">
          <h2>Available Time Slots:</h2>
          {JSON.stringify(availableTimeSlots) !== "{}" ? (
            <div className="grid grid-cols-3 gap-3 py-2">
              {Object.entries(availableTimeSlots).map(
                ([date, reservations]) => (
                  <>
                    {reservations.map((reservation) => (
                      <ReservationModal reservation={reservation} />
                    ))}
                  </>
                )
              )}
            </ div>
          ) : (
            <p>No available slots for selected date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  const publickey = context.params.publickey;

  const reservations = await prisma.reservation.findMany({
    where: {
      restaurantID: publickey,
      isAvailable: true,
    },
  });

  const restaurant = await prisma.user.findUnique({
    where: {
      pubKey: publickey,
    },
  });

  return {
    props: { reservations: reservations, restaurant: restaurant },
  };
}
