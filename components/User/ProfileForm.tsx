"use client";

import { FormEvent, useState } from "react";
import InputBox from "../ui/InputBox";
import { editUserProfile } from "@/actions/user";
import { toast } from "react-toastify";

export default function UserProfileForm({ userData }: any) {
  const [formData, setFormData] = useState({
    name: {
      val: userData.name,
    },
    email: {
      val: userData.email,
    },
  });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [btnLoading, setBtnLoading] = useState(false);

  function inputChange(key: string, value: string) {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: {
          val: value,
        },
      };
    });
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBtnLoading(true);
    const result = (await editUserProfile({ name: formData.name.val, email: formData.email.val })) as {
      name: string;
      email: string;
    };
    if (result && Object.keys(result).length > 0) {
      setErrors(result);
    } else {
      setErrors({name: '', email: ''})
      toast.success("Info updated successfully", {
        autoClose: 1000,
        position: "top-center",
        closeOnClick: true
      })
    }
    setBtnLoading(false);
  }
  return (
    <form onSubmit={submit}>
      <div className="px-3">
        <InputBox
          name="name"
          error={errors.name}
          label="Name"
          type="text"
          value={formData.name.val}
          inputChange={inputChange}
        />
        <InputBox
          name="email"
          error={errors.email}
          label="Email"
          type="email"
          value={formData.email.val}
          inputChange={inputChange}
          classes="mt-3"
        />
      </div>
      <div className="mt-5 p-2 bg-[#f5f5f5] text-right">
        <button
          disabled={btnLoading}
          className="bg-main py-1.5 px-4 rounded-md text-white text-sm tracking-wider transition hover:bg-[#1d7a71] disabled:opacity-70"
        >
          SAVE
        </button>
      </div>
    </form>
  );
}
