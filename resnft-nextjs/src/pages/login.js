// import React from "react";
import React, { useEffect } from "react";
import { useAuthContext, useProfileContext } from "@/contexts/AuthContext";
import * as fcl from "@onflow/fcl";
import { useRouter } from "next/router";
import { fetchProfile } from "@/utils/utils";

const Login = () => {
  const { user, setUser } = useAuthContext();
  const { _, setProfile } = useProfileContext();

  const router = useRouter();

  const handleLogin = () => {
    fcl.authenticate();
    fcl.currentUser().subscribe(setUser);
  };

  useEffect(() => {
    if (!(!user || !user.addr)) {
      fetchProfile({ addr: user.addr })
        .then((data) => {
          setProfile(data.user);
          router.push(`/users/${encodeURIComponent(user.addr)}`);
        })
        .catch((err) => {
          console.log(err);
          router.push(`/users/update-profile`);
        });
    }
  }, [user]);

  return (
    <div className="flex flex-1" id="login-page">
      <div className="flex-1 place-self-center" id="login-content">
        <div className="text-center">
          <div id="login-description" className="text-xl">
            In order to use our platform, you must connect a crypto wallet.
          </div>
          <div id="login-btn">
            <button
              onClick={handleLogin}
              className="px-4 py-2 mt-3 text-white rounded-lg bg-green hover:bg-dark-green"
            >
              CONNECT WALLET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
