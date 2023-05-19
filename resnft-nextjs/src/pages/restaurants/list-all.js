import { useState, useEffect } from "react";
import { getAllRestaurants } from "@/utils/utils";
import Link from "next/link";

const RestaurantListItem = ({ restaurant, style }) => {
  return (
    <div className={style}>
      <button className="font-bold text-lg">
        <Link href={`/restaurants/allReservations/${restaurant.pubKey}`}>
          {restaurant.name}
        </Link>
      </button>
      <p className="text-sm text-slate-800">Sushi * $$$$</p>
      <p className="text-sm text-slate-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          width="1em"
          height="1em"
          className="inline-block m-1 mb-2"
        >
          <path d="M565.6 36.2C572.1 40.7 576 48.1 576 56V392c0 10-6.2 18.9-15.5 22.4l-168 64c-5.2 2-10.9 2.1-16.1 .3L192.5 417.5l-160 61c-7.4 2.8-15.7 1.8-22.2-2.7S0 463.9 0 456V120c0-10 6.1-18.9 15.5-22.4l168-64c5.2-2 10.9-2.1 16.1-.3L383.5 94.5l160-61c7.4-2.8 15.7-1.8 22.2 2.7zM48 136.5V421.2l120-45.7V90.8L48 136.5zM360 422.7V137.3l-144-48V374.7l144 48zm48-1.5l120-45.7V90.8L408 136.5V421.2z" />
        </svg>
        {restaurant.location}{" "}
      </p>
    </div>
  );
};

const ListAllRestaurants = () => {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    getAllRestaurants().then((data) => {
      if (data) {
        setRestaurants(data);
      }
    });
  }, []);

  const restaurantList = (
    <div
      className="flex flex-1 flex-col place-items-center"
      id="restaurant-list"
    >
      <div className="text-4xl max-w-60 text-center pt-10 pb-6">
        <p>Discover reservations at our participating restaurants.</p>
      </div>

      <div className="min-w-max	w-96">
        {restaurants
          ? restaurants.users.map((restaurant, index) => (
              <>
                {index == 0 ? (
                  <RestaurantListItem
                    restaurant={restaurant}
                    style="py-3 px-4 border-b-2  bg-light-green hover:bg-green rounded-t-xl"
                  />
                  
                ) : (
                  ""
                )}

                {index != 0 && index != restaurants.users.length - 1 ? (
                  <RestaurantListItem
                    restaurant={restaurant}
                    style="py-3 px-4 border-b-2 bg-light-green hover:bg-dark-green"
                  />
                ) : (
                  ""
                )}

                {index == restaurants.users.length - 1 ? (
                  <RestaurantListItem
                    restaurant={restaurant}
                    style="py-3 px-4 border-b-2 bg-light-green hover:bg-dark-green rounded-b-xl"
                  />
                ) : (
                  ""
                )}
              </>
            ))
          : ""}
      </div>
    </div>
  );

  return restaurantList;
};

export default ListAllRestaurants;
