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
      <div className="Description">
        Your wallet does not have a profile yet.
        <br/>
        <br/>
        If you would like to create your profile, click{" "}
        <Link href="/users/update-profile">here</Link>.
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="Update-description">
        <h1>Your Profile</h1>
        <h2> Pubkey: {profile.pubKey} </h2>
        <h2> Name: {profile.name} </h2>
        <h2> Email: {profile.email} </h2>
        <h2> Phone: {profile.phone} </h2>
        <h2> Loc: {profile.location} </h2>
        <h2> Menu: {profile.menu} </h2>
        <h2> Description: {profile.description} </h2>
        <h2> NFTs: <GetNFTByOwner addr={profile.pubKey} /> </h2>
      </div>
    </div>
  );
};

export default UserProfile;
