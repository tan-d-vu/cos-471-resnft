import React, { useEffect } from "react";
import { useAuthContext, useProfileContext } from "@/contexts/AuthContext";
import * as fcl from "@onflow/fcl";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchProfile } from "@/utils/utils";

function Navbar() {
  const { user, setUser } = useAuthContext();
  const { profile, setProfile } = useProfileContext();

  const router = useRouter();

  useEffect(() => {
    if (!(!user || !user.addr)) {
      fetchProfile({ addr: user.addr }).then((data) => {
        if (data) {
          setProfile(data.user);
        }
      });
      router.push(`/users/${encodeURIComponent(user.addr)}`);
    }
  }, [user]);

  const navlinkStyle = "block p-4 z-1 hover:bg-slate-200";

  const navbar = (
    <div id="navbar" className="flex justify-between bg-green">
      <div className="relative inline-block group" id="dropdown">
        <button className="p-4 text-white">
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
        </button>

        <div
          className="absolute hidden text-xl text-left text-black bg-white group-hover:block whitespace-nowrap"
          id="nav-content"
        >
          <Link className={navlinkStyle} href="/home">
            Home
          </Link>
          <Link className={navlinkStyle} href="/restaurants/list-all">
            Discover Restaurants
          </Link>

          {user && user.addr ? (
            <>
              <Link
                className={navlinkStyle}
                href={`/users/${encodeURIComponent(user.addr)}`}
              >
                Profile
              </Link>
              <Link className={navlinkStyle} href="/users/update-profile">
                Update Profile
              </Link>

              {profile && profile.isRestaurant ? (
                <>
                  <Link
                    className={navlinkStyle}
                    href={`/restaurants/allReservations/${encodeURIComponent(
                      user.addr
                    )}`}
                  >
                    Reservations
                  </Link>
                  <Link
                    className={navlinkStyle}
                    href="/restaurants/populate-reservations"
                  >
                    Populate Reservations
                  </Link>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <Link className={navlinkStyle} href="/login">
              Login
            </Link>
          )}

          <Link className={navlinkStyle} href="/about">
            About
          </Link>
        </div>
      </div>
      <div className="p-3 h-[80px]" id="nav-logo">
        <img src="/Logo.png" className="max-h-full" alt="logo" />
      </div>
    </div>
  );

  return navbar;
}

export default Navbar;
