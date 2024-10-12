"use client";

import { merchantSignup, userSignupWithEmail } from "@/actions/auth";
import Form from "@/components/ui/Form";
import { motion } from "framer-motion";
import { useState } from "react";

function UserForm() {
  const inputs = [
    { type: "text", name: "username", label: "Username", placeholder: "Enter your username" },
    { type: "email", name: "email", label: "Email", placeholder: "Enter your email address" },
    { type: "password", name: "password", label: "Password", placeholder: "Enter your password" },
  ];

  return <Form formClasses="space-y-3" inputs={inputs} action={userSignupWithEmail} buttonText="Sign up as user" />;
}

function MerchantForm() {
  const inputs = [
    { type: "text", name: "store_name", label: "Store Name", placeholder: "Enter the store name" },
    { type: "file", name: "store_image", label: "Store Image", accept: "image/*" },
    { type: "email", name: "email", label: "Personal Email", placeholder: "Enter your email address" },
    { type: "password", name: "password", label: "Password", placeholder: "Enter your password" },
  ];

  return <Form formClasses="space-y-3" inputs={inputs} action={merchantSignup} buttonText="Sign up as merchant" />;
}

export default function SignupPage() {
  const [selectedForm, setSelectedForm] = useState("user");

  return (
    <div className="h-[100vh] bg-gray-100 pt-40">
      <div className="p-3 rounded-3 w-[80%] sm:w-[450px] mx-auto">
        <div className="options flex gap-5 justify-center mb-10">
          <div
            className="w-28 px-3 py-1.5 text-center rounded-md font-medium cursor-pointer relative"
            onClick={() => setSelectedForm("user")}
          >
            {selectedForm == "user" && (
              <motion.div
                layoutId="indicator"
                className="indicator bg-[#00968729] absolute w-full h-full rounded-md left-0 top-0 z-10"
              ></motion.div>
            )}
            <span className={`relative z-20 ${selectedForm == "user" ? "text-main" : ""}`}>User</span>
          </div>
          <div
            className="w-28 px-3 py-1.5 text-center rounded-md font-medium cursor-pointer relative"
            onClick={() => setSelectedForm("merchant")}
          >
            {selectedForm == "merchant" && (
              <motion.div
                layoutId="indicator"
                className="indicator bg-[#00968729] absolute w-full h-full rounded-md left-0 top-0 z-10"
              ></motion.div>
            )}
            <span className={`relative z-20 ${selectedForm == "merchant" ? "text-main" : ""}`}>Merchant</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl overflow-hidden">
          {selectedForm == "user" ? <UserForm /> : <MerchantForm />}
        </div>
      </div>
    </div>
  );
}
