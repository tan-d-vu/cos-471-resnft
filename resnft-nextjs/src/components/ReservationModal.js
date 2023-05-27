import { useState } from "react";
import Modal from "react-modal";
import Link from "next/link";
import { DateTime } from "luxon";

export const ReservationModal = ({ reservation }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="bg-light-green py-2 rounded-xl hover:bg-dark-green hover:shadow-md"
      >
        {DateTime.fromISO(reservation.datetime).toLocaleString(
          DateTime.TIME_SIMPLE
        )}
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={handleClose}
        contentLabel="Reservation Modal"
        className="flex flex-1 flex-col p-2 justify-center items-center border mt-4 border-1 m-auto bg-white rounded-lg shadow-lg w-96"
      >
        <div className="flex flex-col w-full p-3 leading-relaxed">
          <div className="text-center text-lg">Reservation Information</div>
          <div className="pt-2">
            <p>NFT ID: {reservation.nft}</p>
            <p>
              Time:{" "}
              {DateTime.fromISO(reservation.datetime).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </p>
            <p className="whitespace-pre">Information: {reservation.content}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full gap-2">
          <button
            onClick={handleClose}
            className="py-2 mt-3 rounded-lg bg-light-green hover:bg-dark-green"
          >
            Cancel
          </button>
          <button className="py-2 mt-3 rounded-lg bg-light-green hover:bg-dark-green">
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
    </>
  );
};
