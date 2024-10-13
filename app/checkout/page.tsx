import DashboardSpinner from "@/components/Merchant/DashboardSpinner";
import MainLogo from "@/components/ui/Logo";
import CheckoutSkeleton from "@/components/ui/skeleton/Checkout";
import CheckoutMainForm from "@/components/User/CheckoutMainForm";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function PageContent() {
  const session = await getSession();
  if(session.userType != "user") {
    notFound()
  }
  const userData = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      name: true,
      email: true,
      shipping_infos: { select: { id: true, address: true, country: true } },
      cart: { select: { id: true, option: true, product: true, quantity: true } },
    },
  });

  if (!userData || userData.cart.length == 0) {
    return notFound();
  }

  return <div>
    <CheckoutMainForm userData={userData} />
  </div>;
}

export default async function CheckoutPage() {
  return (
    <>
      <nav className="py-4 shadow">
        <div className="px-4 w-full sm:max-w-screen-lg mx-auto flex justify-between items-center">
          <MainLogo checkout />
          <Link href="/products" className="text-black text-sm underline">
            Continue browsing
          </Link>
        </div>
      </nav>
      <main className="bg-[#f4f5f7] min-h-[100vh]">
        <div className="px-4 w-full sm:max-w-screen-lg mx-auto">
          <Suspense fallback={<DashboardSpinner />}>
            <PageContent />
          </Suspense>
        </div>
      </main>
    </>
  );
}
