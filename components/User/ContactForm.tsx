"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import InputBox2 from "../ui/InputBox2";
import { useForm } from "react-hook-form";
import { contactFormSchema } from "@/lib/validationSchemas";
import { z } from "zod";
import { FaPaperPlane } from "react-icons/fa";
import { sendContactMail } from "@/actions/user";
import { toast } from "react-toastify";

export default function ContactForm() {
  type FormFields = z.infer<typeof contactFormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: FormFields) {
    try {
      await sendContactMail(data)
      reset()
      toast.success("Email successfully sent.", {
        position: "top-center"
      })
    } catch (error) {
      toast.error("An error occured.", {
        position: "top-center"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputBox2
          label="Name"
          error={errors.name}
          register={register("name")}
          type="text"
          placeholder="Enter your name"
        />
        <InputBox2
          label="Email"
          error={errors.email}
          register={register("email")}
          type="text"
          placeholder="Enter your email address"
        />
        <InputBox2
          label="Subject"
          error={errors.subject}
          register={register("subject")}
          type="text"
          placeholder="Enter the subject"
          classes="sm:col-span-2"
        />
        <InputBox2
          label="Message"
          error={errors.message}
          register={register("message")}
          type="textarea"
          placeholder="Enter your Message"
          classes="sm:col-span-2"
        />
      </div>
      <button className="mt-5 bg-main text-white w-full py-2 rounded-md flex items-center gap-2 justify-center hover:bg-[#018579] transition disabled:opacity-70" disabled={isSubmitting}>
        Send Message
        <FaPaperPlane className="text-sm" />
      </button>
    </form>
  );
}
