import React from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import * as fcl from "@onflow/fcl";
import Link from "next/link";

function Navbar() {
  const { user, setUser } = useAuthContext();

  const handleLogin = async () => {
    fcl.authenticate();
    fcl.currentUser().subscribe(setUser);
  };

  const logout = () => {
    fcl.unauthenticate();
    setUser(null);
  };

  return (
    <div className="nav">
      <div className="navbar">
        <div className="dropdown">
          <button className="dropbtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 96 960 960"
              width="48"
            >
              <path
                fill="currentColor"
                d="M115.935 822.696v-68.131h728.13v68.131h-728.13Zm0-212.631v-68.13h728.13v68.13h-728.13Zm0-212.63v-68.37h728.13v68.37h-728.13Z"
              />
            </svg>
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <Link href="/">Home</Link>
            {user && user.addr ? (
              <>
                <Link href={`/users/${encodeURIComponent(user.addr)}`}>
                  Profile
                </Link>
                <Link href="/users/update-profile">Update Profile</Link>
                <Link href="/mint">Mint NFT</Link>
              </>
            ) : (
              ""
            )}

            <Link href="/about">About</Link>
          </div>
        </div>
        <div className="Nav-Btns">
          {!user || !user.addr ? (
            <button onClick={handleLogin} className="Nav-Button">
              <h2>Login</h2>
            </button>
          ) : (
            ""
          )}

          {user && user.addr ? (
            <button onClick={logout} className="Nav-Button">
              <h2>Logout</h2>
            </button>
          ) : (
            ""
          )}
        </div>
        <h1 className="SiteName"> Flow NFT </h1>
      </div>
    </div>
  );
}

export default Navbar;
