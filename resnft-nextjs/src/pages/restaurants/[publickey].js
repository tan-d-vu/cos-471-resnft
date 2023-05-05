import { useRouter } from "next/router";
import GetNFTByOwner from "@/components/nfts/GetNFTByOwner";

function Restaurant() {
  const router = useRouter();
  const { publickey } = router.query;

  return (
    <div>
      <GetNFTByOwner addr={publickey} />
    </div>
  );
}

export default Restaurant;
