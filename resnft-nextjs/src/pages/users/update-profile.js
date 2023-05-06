import React from "react";
import { useState } from "react";
import { useAuthContext, useProfileContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import * as fcl from "@onflow/fcl";

const UpdateProfile = () => {
  const { user, _ } = useAuthContext();
  const { profile, setProfile } = useProfileContext();
  const router = useRouter();

  console.log(profile);

  const [formData, setFormData] = useState({
    userType: "customer",
    name: "",
    email: "",
    phone: "",
    location: "",
    menu: "",
    description: "",
    pubKey: "",
  });

  if (!user || !user.addr) {
    return (
      <div className="update-profile">
        <h2> Please Sign In to Update Your Profile </h2>
      </div>
    );
  } else {
    formData.pubKey = user.addr;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/users/update", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.user);
      })
      .catch((error) => console.error(error));

    router.push(`/users/${encodeURIComponent(user.addr)}`);
  };

  return (
    <div className="update-profile">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userType">I am a:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
          >
            <option value="customer">Customer</option>
            <option value="restaurant">Restaurant</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            required
            minLength="1"
            maxLength="50"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {formData.userType === "restaurant" && (
          <>
            <div>
              <label htmlFor="menu">Menu:</label>
              <textarea
                name="menu"
                value={formData.menu}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>{" "}
    </div>
  );
};

export default UpdateProfile;
