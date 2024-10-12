import UserProfileForm from "@/components/User/ProfileForm";
import UserShippingInfoForm from "@/components/User/ShippingInfoForm";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function UserProfile() {
  const session = await getSession();

  const userData = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true, email: true, shipping_infos: { select: { id: true, address: true, country: true } } },
  });

  return (
    <>
      <div className="mt-5 pt-3 rounded-md shadow bg-white overflow-hidden">
        <div className="px-3">
          <h1 className="text-xl tracking-wide mb-3 pb-3 border-b">Edit Profile</h1>
        </div>
        <UserProfileForm userData={userData} />
      </div>
      <div className="mt-5 p-3 rounded-md shadow bg-white overflow-hidden">
        <h1 className="text-xl tracking-wide mb-3 pb-3 border-b">Shipping Info</h1>
        <UserShippingInfoForm userData={userData} />
      </div>
    </>
  );
}
