export const fetchProfile = ({ addr }) => {
  return fetch("/api/users/get-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ addr: addr }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};


export const setReservationNFTs = ({ addr, nfts }) => {
  return fetch("/api/restaurants/set-reservation-nft", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ addr: addr, nfts: nfts }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
