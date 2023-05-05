import { useState } from "react";
import GetNFTByOwner from "../../components/nfts/GetNFTByOwner";
import prisma from "../../../prisma/lib/prisma";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
const UserProfile = ({ profileData }) => {
  const { user, _ } = useAuthContext();

  if (!profileData) {
    if (!user || !user.addr) {
      return <div> Sign-in if this is your public key </div>;
    } else {
      return (
        <div>
          Profile not created.
          <Link href="/users/update-profile"> Create Profile </Link>
        </div>
      );
    }
  }

  return (
    <div className="user-profile">
      <h1> {profileData.pubKey} </h1>
      <h1> {profileData.name} </h1>
      <h2> {profileData.email} </h2>
      <h3> {profileData.phone} </h3>
      <h4> {profileData.location} </h4>
      <h5> {profileData.menu} </h5>
      <h6> {profileData.description} </h6>
      <GetNFTByOwner addr={profileData.pubKey} />
    </div>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  const publickey = context.params.publickey;

  const user = await prisma.user.findUnique({
    where: {
      pubKey: publickey,
    },
  });

  return {
    props: { profileData: user },
  };
}
