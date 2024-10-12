"use client";

import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import FormButton from "../ui/FormButton";
import InputBox2 from "../ui/InputBox2";
import SelectBox from "../ui/SelectBox";
import ImagesInput from "../ui/ImagesInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/validationSchemas";
import { addProduct } from "@/actions/merchant";
import OptionsInput from "./OptionsInput";

type FormFields = z.infer<typeof productSchema>;

export default function AddProductForm({ categories }: { categories: string[] }) {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      images: [],
      options: [],
    },
    resolver: zodResolver(productSchema),
  });

  const imagesChange = (updatedImages: File[]) => {
    setValue("images", updatedImages);
    trigger("images");
  }

  const optionsChange = (updatedOptions: {name: string; price: number}[]) => {
    setValue("options", updatedOptions);
    trigger("options");
  }

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "images") {
        const value = data[key as keyof FormFields];

        if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value)); // Convert other types (number, string) to string format
        }
      }
    });

    data.images.forEach((file: File, index: number) => {
      formData.append(`image_${index}`, file);
    });

    await addProduct(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <div className="grid grid-cols-2 gap-5">
        <InputBox2
          label="Product Name"
          type="text"
          error={errors.name}
          placeholder="Enter product's name"
          register={register("name")}
        />

        <InputBox2
          label="Price"
          type="number"
          placeholder="Enter product's price"
          error={errors.price}
          register={register("price", { valueAsNumber: true })}
        />

        <ImagesInput
          label="Product Images"
          error={errors.images as FieldError | undefined}
          name="images"
          images={watch("images")}
          onChange={imagesChange}
        />

        <SelectBox
          name="category"
          label="Category"
          data={categories}
          error={errors.category}
          register={register("category")}
          placeholder="Choose Category"
        />

        <InputBox2
          label="Additional Shipping Price"
          type="number"
          error={errors.shipping_price}
          placeholder="Enter shipping price"
          register={register("shipping_price", { valueAsNumber: true })}
        />

        <OptionsInput error={errors.options as FieldError} options={watch("options")} onChange={optionsChange} />

        <InputBox2
          label="Product Description"
          type="textarea"
          placeholder="Enter product description"
          error={errors.description}
          register={register("description")}
          classes="col-span-2"
        />

        <InputBox2
          label="Refund & Return Policy"
          type="textarea"
          placeholder="Enter refund & return policy"
          error={errors.return_policy}
          register={register("return_policy")}
          classes="col-span-2"
        />

        <InputBox2
          label="Product Shipping Info"
          type="textarea"
          placeholder="Enter shipping information"
          error={errors.shipping_info}
          register={register("shipping_info")}
          classes="col-span-2"
        />
      </div>

      <FormButton loading={isSubmitting} classes="mt-5">
        Add Product
      </FormButton>
    </form>
  );
}
