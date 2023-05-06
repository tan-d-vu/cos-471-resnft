import prisma from "../../../../prisma/lib/prisma";

export default async function handler(req, res) {
  const method = req.method;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

	const { addr } = req.body;

	// Find user profile with address
	const user = await prisma.user.findUnique({
		where: { pubKey: addr },
	});

  return res.status(200).json({ user: user });
}
