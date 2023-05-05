import React from "react";
import UserProfileForm from "@/components/users/UserProfileForm";
import { useAuthContext } from "@/contexts/AuthContext";

const UpdateProfile = () => {
  const { user, _ } = useAuthContext();

  if (!user || !user.addr) {
    return (
      <div className="update-profile">
        <h2> Please Sign In to Update Your Profile </h2>
      </div>
    );

  }

  return (
    <div className="update-profile">
      <UserProfileForm />
    </div>
  );
};

export default UpdateProfile;
