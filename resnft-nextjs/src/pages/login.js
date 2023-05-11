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
      fetchProfile({ addr: user.addr }).then((data) => {
          setProfile(data.user);
      });
      router.push(`/users/${encodeURIComponent(user.addr)}`);
    }
  }, [user]);

  return (
    <div className="flex-1">
      <div className="Log-content">
        <div className="Description">
          In order to use our platform, you must connect a crypto wallet. You
          can log in here.
        </div>
        <div className="Log-btn-container">
          {!user || !user.addr ? (
            <>
              <button onClick={handleLogin} className="Log-Button">
                CONNECT WALLET
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
