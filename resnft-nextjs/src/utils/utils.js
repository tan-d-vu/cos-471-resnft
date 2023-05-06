export const fetchProfile = ({ addr }) => {
  return fetch("/api/users/get-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ addr: addr }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
};
