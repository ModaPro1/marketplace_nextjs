import MainNavbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

export default async function PaymentReturnPage({ searchParams }: { searchParams: any }) {
  const sessionId = searchParams.session_id;
  if (!sessionId) {
    notFound();
  }
  const result = await fetch(`${process.env.SITE_URL}/api/checkout_session?session_id=${sessionId}`, {cache: "no-store"});

  const data = await result.json();
  
  if(data.error) {
    notFound()
  }

  return (
    <>
      <MainNavbar />
      <div className="text-center pt-40 min-h-[100vh] bg-[#f4f5f7]">
        {data.status == "complete" ? (
          <div className="mx-auto box bg-white p-5 rounded-md shadow w-full sm:w-96 border-b-4 border-[#28a745]">
            <FaCheckCircle fontSize={55} className="text-[#28a745] inline" />
            <h2 className="my-4 text-3xl font-medium">Your payment was successful</h2>
            <p className="text-gray-600 text-sm">
              Thank you for ordering from our marketplace, you can now track you order in your orders page.
            </p>
            <Link href={`/orders/${data.orderId}`} className="bg-[#28a745] text-white mt-5 py-2 px-4 rounded-md block w-fit mx-auto">
              View order
            </Link>
          </div>
        ) : (
          <div className="mx-auto box bg-white p-5 rounded-md shadow w-full sm:w-96 border-b-4 border-red-600">
            <FaCircleXmark fontSize={55} className="text-red-600 inline" />
            <h2 className="my-4 text-4xl font-medium">Your payment failed</h2>
            <p className="text-gray-600">
              There is a problem in your payment, please try again or contact us for further help.
            </p>
          </div>
        )}
        <p className="text-gray-800 text-sm mt-5">
          Have a problem?{" "}
          <Link href="/contact" className="underline">
            Contact us
          </Link>
        </p>
      </div>
    </>
  );
}
