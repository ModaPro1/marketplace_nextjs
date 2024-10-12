import { FormEvent, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { UserDataWithShippingInfo } from "./CheckoutMainForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPayment({userData, back}: {userData: UserDataWithShippingInfo; back: () => void}) {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userData,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  function submit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={submit} className="pt-10">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout className="bg-transparent" />
      </EmbeddedCheckoutProvider>
    </form>
  );
}
