'use client'
import { Merchant } from "@prisma/client";
import Image from "next/image";
import { IoCameraOutline } from "react-icons/io5";
import InputBox2 from "../ui/InputBox2";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { merchantSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useRef, useState } from "react";
import { editProfile } from "@/actions/merchant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditProfile({ merchant }: { merchant: Merchant }) {
  type FormFields = z.infer<typeof merchantSchema>
  
  const router = useRouter()
  const {register, handleSubmit, trigger, setValue, setError, formState: {errors, isSubmitting, }} = useForm<FormFields>({
    defaultValues: {
      store_name: merchant.store_name,
      email: merchant.email,
    },
    resolver: zodResolver(merchantSchema)
  })
  const [storeImage, setStoreImage] = useState('')
  const imageInput = useRef<HTMLInputElement>(null)

  function imageChange(e: ChangeEvent<HTMLInputElement>) {
    if(e.target.files && e.target.files[0]) {
      setValue("store_image", e.target.files[0])
      trigger("store_image")
      setStoreImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  async function submit(data: FormFields) {
    const formData = new FormData()
    formData.append("store_name", data.store_name)
    formData.append("store_image", data.store_image || '')
    formData.append("email", data.email)

    const result = await editProfile(formData, merchant.id)

    if(!result.success) {
      if(result.type == "email_taken") {
        setError("email", {message: result.message})
      }
    } else {
      router.refresh()
      toast.success("Profile updated successfully", {autoClose: 2000, position: "top-center"})
    }
  }
  
  return (
    <div className="bg-white p-4 shadow rounded-sm">
      <div className="mx-auto w-fit relative">
        <Image
          src={storeImage || merchant.store_image}
          alt="Merchant Store Image"
          width={100}
          height={100}
          className="w-24 h-24 rounded-full"
        />
        <button className="absolute right-0 bottom-0 text-white bg-main w-7 h-7 rounded-full flex justify-center items-center" onClick={() => imageInput.current!.click()}>
          <IoCameraOutline />
        </button>
        <input type="file" accept="image/*" ref={imageInput} hidden onChange={imageChange} />
      </div>
      <form className="mt-5 pt-5 border-t" onSubmit={handleSubmit(submit)}>
        <InputBox2 label="Store Name" type="text" register={register("store_name")} error={errors.store_name} />
        <InputBox2 label="Email Address" type="email" register={register("email")} error={errors.email} classes="mt-2" />
        <button className="mt-4 py-2 px-3 bg-main transition rounded text-white text-sm disabled:opacity-70" disabled={isSubmitting}>Edit Profile</button>
      </form>
    </div>
  );
}
