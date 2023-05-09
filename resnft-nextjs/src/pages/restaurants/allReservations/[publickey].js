import prisma from "../../../../prisma/lib/prisma";
import React, { useState } from "react";
import { DateTime } from "luxon";
import Modal from "react-modal";
import Link from "next/link";

const ReservationModal = ({ reservation }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <button onClick={handleShow} className="Gen-Button">
        {DateTime.fromISO(reservation.datetime).toLocaleString(
          DateTime.TIME_SIMPLE
        )}
      </button>
      <br/><br/>
      <Modal
        isOpen={showModal}
        onRequestClose={handleClose}
        contentLabel="Reservation Modal"
      >
        <div className="Update-description">
          {/* {reservation.datetime} */}
          Confirm reservation for:
          <br />
          {reservation.nft}
          {DateTime.fromISO(reservation.datetime).toLocaleString(
            DateTime.DATE_SIMPLE
          )}
          <br/>
          {DateTime.fromISO(reservation.datetime).toLocaleString(
            DateTime.TIME_SIMPLE
          )}
          <br />

          <button onClick={handleClose}>close</button>
          <button className="Gen-Button">
            <Link
              href={`/restaurants/reservations/${encodeURIComponent(
                reservation.id
              )}`}
            >
              Book
            </Link>
          </button>
        </div>
      </Modal>
    </div>
  );
};

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

  return (
    <div>
      <div className="Update-description">
        <h1>Reservation List</h1>
        <form>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            min={DateTime.now().toISODate()}
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
          <>
            {availableTimeSlots.map((reservation) => (
              <ReservationModal reservation={reservation} />
            ))}
          </>
        ) : (
          <p>No available time slots for selected date and time.</p>
        )}
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

  return {
    props: { reservations: reservations },
  };
}
