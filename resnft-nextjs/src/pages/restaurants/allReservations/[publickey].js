import prisma from "../../../../prisma/lib/prisma";
import { useAuthContext } from "@/contexts/AuthContext";

const UserProfile = ({ reservations }) => {
  console.log(reservations);

  return <div className="user-profile">afsdfasd</div>;
};

export default UserProfile;

export async function getServerSideProps(context) {
  const publickey = context.params.publickey;

  const reservations = await prisma.reservation.findMany({
    where: {
      restaurantID: publickey,
    },
  });

  return {
    props: { reservations: reservations },
  };
}
