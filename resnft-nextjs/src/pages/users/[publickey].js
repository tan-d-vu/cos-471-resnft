import { useState } from "react";
import GetNFTByOwner from "../../components/nfts/GetNFTByOwner";
import prisma from "../../../prisma/lib/prisma";

const UserProfile = ({ profileData }) => {
  console.log(profileData);

  if (!profileData) {
    return <div> Loading... </div>;
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
