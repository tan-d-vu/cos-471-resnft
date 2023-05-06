import { useState, useEffect } from "react";
import GetNFTByOwner from "../../components/nfts/GetNFTByOwner";
import { useRouter } from "next/router";
import { fetchProfile } from "@/utils/utils";
import Link from "next/link";

const UserProfile = () => {
  const router = useRouter();
  const { publickey } = router.query;

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (publickey) {
      fetchProfile({ addr: publickey }).then((data) => {
        if (data) {
          setProfile(data.user);
        }
      });
    }
  }, [publickey]);

  if (!profile) {
    return (
      <div>
        Profile Not Found
        <br />
        If you haven't created your profile, click{" "}
        <Link href="/users/update-profile">here</Link> to create it.
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h1> Pubkey: {profile.pubKey} </h1>
      <h1> Name: {profile.name} </h1>
      <h1> Email: {profile.email} </h1>
      <h1> Phone {profile.phone} </h1>
      <h1> Loc: {profile.location} </h1>
      <h1> Menu {profile.menu} </h1>
      <h1> Desc: {profile.description} </h1>
      <h1> NFTs: </h1>
      <GetNFTByOwner addr={profile.pubKey} />
    </div>
  );
};

export default UserProfile;
