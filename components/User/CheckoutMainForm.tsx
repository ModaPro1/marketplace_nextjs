"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CheckoutCustomerInfoForm from "./CheckoutCustomerInfoForm";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutCartSummary from "./CheckoutCartSummary";
import { ProductOption } from "@prisma/client";

export type CheckoutData = {
  email: string;
  name: string;
  phone: string;
  selected_shipping_info: {
    id: string;
    address: string;
    country: string;
  };
};

export type UserDataWithShippingInfo = {
  name: string;
  email: string;
  shipping_infos: {
    id: string;
    address: string;
    country: string;
  }[];
  cart?: {
    option: ProductOption;
    id: string;
    product: {
      id: string;
      name: string;
      description: string;
      policy_text: string;
      shipping_info_text: string;
      price: number;
    };
    quantity: number;
  }[];
  customer_details?: {
    email: string;
    name: string;
    phone: string;
    selected_shipping_info: {
      id: string;
      address: string;
      country: string;
    };
  };
};

export default function CheckoutMainForm({ userData }: { userData: any }) {
  const [step, setStep] = useState(1);

  function firstStepSubmit(data: CheckoutData) {
    userData.customer_details = data;
    setStep(2);
  }

  const fadeTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <AnimatePresence mode="wait">
      {step === 1 && (
        <motion.div
          key="step1"
          {...fadeTransition}
          className="flex flex-col-reverse sm:flex-row gap-5 relative pt-10 items-start"
        >
          <CheckoutCustomerInfoForm onSubmit={firstStepSubmit} userData={userData} />
          <CheckoutCartSummary cart={userData.cart} />
        </motion.div>
      )}

      {step === 2 && (
        <motion.div key="step2" {...fadeTransition}>
          <CheckoutPayment userData={userData} back={() => setStep(1)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
