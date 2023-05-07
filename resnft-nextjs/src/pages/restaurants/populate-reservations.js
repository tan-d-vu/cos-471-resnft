// Populating the database with available reservation times
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

const RestaurantCreateManyReservations = () => {
  const router = useRouter();
  const { user, _ } = useAuthContext();

  const [formData, setFormData] = useState({
    period: "1 day",
    openingTime: "18:00",
    closingTime: "20:00",
    reservationDuration: "45",
    numTables: "10",
    miscInfo: "xdfsdajkdsfauiuiweqr",
    pubKey: "",
  });

  const [confirm, setConfirm] = useState(false);

  if (!user || !user.addr) {
    return (
      <div className="update-profile">
        <h2> Please Sign In to Create Reservations</h2>
      </div>
    );
  } else {
    formData.pubKey = user.addr;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirm) {
      fetch("/api/restaurants/populate-reservations", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }

    setTimeout(() => {
      router.push(
        `/restaurants/allReservations/${encodeURIComponent(user.addr)}`
      );
    }, 2000); // wait for db to populate lol...
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Period:
          <select
            name="period"
            value={formData.period}
            onChange={handleInputChange}
          >
            <option value="1 day">1 day</option>
            <option value="7 days">7 days</option>
          </select>
        </label>
        <br />
        <label>
          Opening Time:
          <input
            type="time"
            name="openingTime"
            required
            value={formData.openingTime}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Closing Time:
          <input
            type="time"
            name="closingTime"
            required
            value={formData.closingTime}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Reservation Duration (in minutes):
          <input
            type="number"
            name="reservationDuration"
            required
            value={formData.reservationDuration}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of Tables Available:
          <input
            type="number"
            name="numTables"
            required
            value={formData.numTables}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Other Information:
          <textarea
            name="miscInfo"
            value={formData.miscInfo}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={confirm}
            onChange={(e) => setConfirm(e.target.checked)}
          />
          Confirm mass creation of available reservations
        </label>
        <br />
        <button type="submit" disabled={!confirm}>
          Create Available Reservations
        </button>
      </form>
    </div>
  );
};

export default RestaurantCreateManyReservations;


// TODO:
// After creating in db, redirect to /restaurants/allReservations/[pubKey]
// and display the reservations
// Create new NFTs for each reservation from this page?
// How?