import React from "react";
import { useState } from "react";
import { useAuthContext, useProfileContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import * as fcl from "@onflow/fcl";
import { setup } from "../../cadence/transactions/setup.js";
import { Input, Select } from "@/components/Form.js";
import { LoadingModal } from "@/components/LoadingModal.js";

const UpdateProfile = () => {
  const { user, _ } = useAuthContext();
  const { profile, setProfile } = useProfileContext();
  const [isWaiting, setIsWaiting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    userType: profile && profile.isRestaurant ? "restaurant" : "customer",
    name: profile && profile.name ? profile.name : "",
    email: profile && profile.email ? profile.email : "",
    phone: profile && profile.phone ? profile.phone : "",
    location: profile && profile.location ? profile.location : "",
    menu: profile && profile.menu ? profile.menu : "",
    description: profile && profile.description ? profile.description : "",
    isSetup: profile && profile.isSetup ? profile.isSetup : false,
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

  const setupAccount = async () => {
    return await fcl.send([
      fcl.transaction(setup),
      fcl.args(),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999),
    ]);
  };

  const updateAccount = async () => {
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
      .then(() => router.push(`/users/${encodeURIComponent(user.addr)}`))
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {
    setIsWaiting(true);
    e.preventDefault();
    if (!formData.isSetup) {
      setupAccount().then((res) => {
        console.log("Transaction ID:" + res);
        fcl
          .tx(res)
          .onceSealed()
          .catch((error) => console.error(error))
          .then(() => {
            formData.isSetup = true;
            updateAccount();
          });
      });
    } else {
      updateAccount();
    }
  };

  const updateForm = (
    <div className="flex flex-1 flex-col">
      <div className="text-3xl self-center max-w-lg text-center pt-6 pb-6">
        <p>Update Profile</p>
      </div>

      {isWaiting ? <LoadingModal msg="Processing Update..." /> : ""}

      <div className="flex flex-1 justify-center">
        <form className="flex-1 max-w-lg" onSubmit={handleSubmit}>
          <Select
            label="I am a:"
            name="userType"
            onChange={handleInputChange}
            value={formData.userType}
            options={[
              { label: "Customer", value: "customer" },
              { label: "Restaurant", value: "restaurant" },
            ]}
          />
          <Input
            elementType="input"
            label="Name"
            name="name"
            type="text"
            onChange={handleInputChange}
            value={formData.name}
          />
          <Input
            elementType="input"
            type="email"
            label="Email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
          />
          <Input
            elementType="input"
            type="tel"
            label="Phone"
            name="phone"
            onChange={handleInputChange}
            value={formData.phone}
          />
          <Input
            elementType="input"
            type="text"
            label="Location"
            name="location"
            onChange={handleInputChange}
            value={formData.location}
          />
          {formData.userType === "restaurant" && (
            <>
              <Input
                elementType="textarea"
                label="Menu"
                name="menu"
                onChange={handleInputChange}
                value={formData.menu}
              />
              <Input
                elementType="textarea"
                label="Description"
                name="description"
                onChange={handleInputChange}
                value={formData.description}
              />
            </>
          )}
          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 mt-3 shadow-xl text-white rounded-lg bg-green hover:bg-dark-green"
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return updateForm;
};

export default UpdateProfile;
