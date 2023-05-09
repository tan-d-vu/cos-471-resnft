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
      <div className="modal-window">
        <Modal
          isOpen={showModal}
          onRequestClose={handleClose}
          contentLabel="Reservation Modal"
          className="my-modal"
        >
          <div className="Update-description">
            {/* {reservation.datetime} */}
            
              <button onClick={handleClose} className="Close-Button">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m251.333 866.406-61.739-61.739L418.26 576 189.594 347.333l61.739-61.739L480 514.26l228.667-228.666 61.739 61.739L541.74 576l228.666 228.667-61.739 61.739L480 637.74 251.333 866.406Z"/></svg>
              </button>
              <h3>Confirm reservation for:
              <br/>
              nft.{reservation.nft}
              <br/>
              {DateTime.fromISO(reservation.datetime).toLocaleString(
                DateTime.DATE_SIMPLE
              )}
              <br/>
              {DateTime.fromISO(reservation.datetime).toLocaleString(
                DateTime.TIME_SIMPLE
              )} </h3>
              <br />

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
          <br/>

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
