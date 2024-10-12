import NavItems from "./NavItems";
import { getUserById, getSession, getMerchantById } from "@/lib/auth";
import { CartWithProduct, getUserCart } from "@/actions/user";
import { prisma } from "@/lib/prisma";

export default async function MainNavbar({ noFixed }: { noFixed?: boolean }) {
  const session = await getSession();

  let user;
  let cartData;
  let userHasOrders = false;

  if (session.userType == "user") {
    user = await getUserById(session.userId);
    cartData = await getUserCart();
    const userOrders = await prisma.order.count({ where: { userId: user?.id } });
    if (userOrders > 0) {
      userHasOrders = true;
    }
  } else {
    user = await getMerchantById(session.userId);
  }

  return (
    <nav className={`${!noFixed ? "fixed w-full z-50" : ""} bg-white shadow-sm`}>
      <div className="custom-container flex justify-between items-center">
        <NavItems
          userHasOrders={userHasOrders}
          user={user}
          session={{ ...session }}
          cartData={cartData as CartWithProduct[]}
        />
      </div>
    </nav>
  );
}
