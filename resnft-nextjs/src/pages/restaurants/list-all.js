import { useState, useEffect } from "react";
import { getAllRestaurants } from "@/utils/utils";
import Link from "next/link";

const ListAllRestaurants = () => {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    getAllRestaurants().then((data) => {
      if (data) {
        setRestaurants(data);
      }
    });
  }, []);

  console.log(restaurants);

  return (
    <>
      <div className="Update-description">
        {restaurants
          ? restaurants.users.map((restaurant) => (
              <Link href={`/restaurants/allReservations/${restaurant.pubKey}`}>
                {restaurant.name}
                <br />
              </Link>
            ))
          : ""}
      </div>
    </>
  );
};

export default ListAllRestaurants;
