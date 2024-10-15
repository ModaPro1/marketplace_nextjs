"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import InputBox2 from "../ui/InputBox2";
import { useForm } from "react-hook-form";
import { contactFormSchema } from "@/lib/validationSchemas";
import { z } from "zod";

export default function ContactForm() {
  type FormFields = z.infer<typeof contactFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(contactFormSchema),
  });

  function onSubmit(data: FormFields) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        label="Message"
        error={errors.message}
        register={register("message")}
        type="textarea"
        placeholder="Enter your Message"
      />
      <button>Contact</button>
    </form>
  );
}
