import { useState, useEffect } from "react";
import GetNFTByOwner from "../../components/nfts/GetNFTByOwner";
import { useRouter } from "next/router";
import { fetchProfile } from "@/utils/utils";
import Link from "next/link";
import { TabGroup, TabContent } from "@/components/TabGroup";

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
        <br />
        <br />
        If you would like to create your profile, click{" "}
        <Link href="/users/update-profile">here</Link>.
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center	">
      <div className="text-3xl max-w-lg text-center pt-6 pb-6">
        <p>{profile.name}</p>
      </div>
      <div className="min-w-full bg-light-green border border-1 border-slate-300 rounded-md">
        <TabGroup>
          <TabContent title="Profile">
            <p>Public Key: {profile.pubKey}</p>
            <p> Email: {profile.email} </p>
            <p> Phone: {profile.phone} </p>
            <p> Location: {profile.location} </p>
          </TabContent>

          <TabContent title="NFTs Owned">
            <GetNFTByOwner addr={profile.pubKey} />
          </TabContent>

          {profile.isRestaurant ? (
            <TabContent title="About">
              <p>Menu: {profile.menu}</p>
              <p>Description: {profile.description}</p>
            </TabContent>
          ) : (
            ""
          )}
        </TabGroup>
      </div>
    </div>
  );
};

export default UserProfile;
