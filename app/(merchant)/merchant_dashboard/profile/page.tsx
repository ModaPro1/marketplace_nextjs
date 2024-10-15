import BreadCrumb from "@/components/Merchant/BreadCrumb";
import EditProfile from "@/components/Merchant/EditProfile";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await getSession();
  const merchant = await prisma.merchant.findUnique({ where: { id: session.userId } });
  if (!merchant) {
    return;
  }

  return (
    <>
      <BreadCrumb current="Profile" classes="mb-5" />
      <EditProfile merchant={merchant} />
    </>
  );
}
