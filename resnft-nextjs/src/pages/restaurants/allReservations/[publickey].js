import prisma from "../../../../prisma/lib/prisma";
import React, { useState } from "react";
import { DateTime } from "luxon";

import { useAuthContext } from "@/contexts/AuthContext";

const UserProfile = ({ reservations }) => {
  const [searchDate, setSearchDate] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const handleDateChange = (event) => {
    setSearchDate(event.target.value);
    // Update available time slots based on selected date and time
    updateAvailableTimeSlots(event.target.value, searchTime);
  };

  const handleTimeChange = (event) => {
    setSearchTime(event.target.value);
    // Update available time slots based on selected date and time
    updateAvailableTimeSlots(searchDate, event.target.value);
  };

  const updateAvailableTimeSlots = (date, time) => {
    let selectedTime = new Date(`${date}T${time}:00`);
    selectedTime = DateTime.fromJSDate(selectedTime);

    // Filter reservations to find available time slots for selected date and time
    const availableSlots = reservations.filter((reservation) => {
      const reservationDateTime = DateTime.fromISO(reservation.datetime);
      return reservationDateTime >= selectedTime;
    });

    setAvailableTimeSlots(availableSlots);
  };

  const handleSlotClick = (time) => {
    console.log(time);
  };

  return (
    <div>
      <h1>Reservation List</h1>
      <form>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={searchDate}
          onChange={handleDateChange}
        />

        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={searchTime}
          onChange={handleTimeChange}
        />
      </form>

      <h2>Available Time Slots:</h2>
      {availableTimeSlots.length > 0 ? (
        <ul>
          {availableTimeSlots.map((reservation) => (
            <li
              key={reservation.id}
              onClick={() => handleSlotClick(reservation.datetime)}
            >
              {reservation.datetime}
            </li>
          ))}
        </ul>
      ) : (
        <p>No available time slots for selected date and time.</p>
      )}
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

  return {
    props: { reservations: reservations },
  };
}
