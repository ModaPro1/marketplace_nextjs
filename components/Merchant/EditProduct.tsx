"use client";

import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import FormButton from "../ui/FormButton";
import InputBox2 from "../ui/InputBox2";
import SelectBox from "../ui/SelectBox";
import ImagesInput from "../ui/ImagesInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchemaWithoutImage } from "@/lib/validationSchemas";
import { addProduct, editProduct } from "@/actions/merchant";
import OptionsInput from "./OptionsInput";
import { Category, Product, ProductOption } from "@prisma/client";

type FormFields = z.infer<typeof productSchemaWithoutImage>;

export default function EditProductForm({
  categories,
  product,
}: {
  categories: string[];
  product: Product & { category: Category; options: ProductOption[] };
}) {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: product.name,
      price: product.price,
      shipping_price: product.shipping_price,
      description: product.description,
      return_policy: product.return_policy_text,
      shipping_info: product.shipping_info_text,
      category: product.category.name,
      options: product.options,
    },
    resolver: zodResolver(productSchemaWithoutImage),
  });

  const optionsChange = (updatedOptions: { name: string; price: number }[]) => {
    setValue("options", updatedOptions);
    trigger("options");
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        const value = data[key as keyof FormFields];

        if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
    });

    await editProduct(formData, product.id);
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
        Edit Product
      </FormButton>
    </form>
  );
}
