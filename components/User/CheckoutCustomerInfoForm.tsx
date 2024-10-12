import { FormEvent, useState } from "react";
import { CheckoutData, UserDataWithShippingInfo } from "./CheckoutMainForm";
import InputBox from "../ui/InputBox";
import { RiEdit2Line, RiErrorWarningFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { CgMathPlus } from "react-icons/cg";
import { addAddressModal } from "./ShippingInfoForm";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";

export default function CheckoutCustomerInfoForm({
  userData,
  onSubmit,
}: {
  userData: UserDataWithShippingInfo;
  onSubmit: (data: CheckoutData) => void;
}) {
  const addressOptions = Object.assign(
    {},
    ...userData.shipping_infos.map((info) => ({ [info.id]: `${info.country} - ${info.address}` }))
  );
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: userData.email,
    name: userData.name,
    phone: "",

    selected_shipping_info: userData.shipping_infos[0] || null,
  });
  const [errors, setErrors] = useState({
    selected_shipping_info: ''
  })

  function inputChange(key: string, value: string) {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  async function changeAddress() {
    const result = await Swal.fire({
      title: "Change shipping address",
      input: "select",
      inputOptions: addressOptions,
      inputValue: formData.selected_shipping_info.id,
      confirmButtonColor: "#009688",
      confirmButtonText: "Change",
      showCancelButton: true,
      showCloseButton: true,
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const selectedOption = userData.shipping_infos.find((info) => info.id == result.value);

      setFormData((prev: any) => {
        return { ...prev, selected_shipping_info: selectedOption };
      });
    }
  }

  async function addAddress() {
    const result = await addAddressModal();
    if (result.isConfirmed) {
      toast.success("Shipping address added", {
        autoClose: 1000,
        position: "top-center",
        closeOnClick: true,
      });
      router.refresh();
      setFormData((prev: any) => {
        return { ...prev, selected_shipping_info: result.address };
      });
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if(!formData.email || !formData.name || !formData.phone) {
      return;
    }
    if(!formData.selected_shipping_info) {
      setErrors(prev => {
        return {...prev, selected_shipping_info: "You must select a shipping address"}
      })
      return;
    }
    onSubmit(formData);
  }

  return (
    <form className="w-full flex-1" onSubmit={submit}>
      <div className="customer-details">
        <h2 className="font-medium text-xl">Customer details</h2>
        <div className="mt-4">
          <InputBox
            inputChange={inputChange}
            name="email"
            label="Email"
            value={formData.email}
            type="email"
            labelClasses="font-normal"
            error={""}
            required
          />
          <InputBox
            name="name"
            label="Full name"
            value={formData.name}
            error={""}
            type="text"
            labelClasses="font-normal"
            classes="mt-3"
            inputChange={inputChange}
            required
          />
          <InputBox
            name="phone"
            label="Phone"
            error={""}
            type="number"
            labelClasses="font-normal"
            classes="mt-3"
            inputChange={inputChange}
            required
          />
        </div>
      </div>
      <div className="delivery-details mt-5">
        <h2 className="font-medium text-xl">Delivery details</h2>
        <div className="mt-4">
          <div className="input-box">
            {formData.selected_shipping_info ? (
              <div>
                {formData.selected_shipping_info.country} - {formData.selected_shipping_info.address}
                <button className="text-sm ms-2 text-main font-medium" type="button" onClick={changeAddress}>
                  <RiEdit2Line className="inline me-1" />
                  Change Address
                </button>
                <button className="text-sm ms-2 text-main font-medium" type="button" onClick={addAddress}>
                  <CgMathPlus className="inline me-1" />
                  Add Address
                </button>
              </div>
            ) : (
              <div className={clsx("flex items-center",{
                "text-red-700": errors.selected_shipping_info,
                "text-gray-500": !errors.selected_shipping_info,
              })}>
                {errors.selected_shipping_info && (<RiErrorWarningFill className="text-red-700 me-1" />)}
                There is no saved addresses{" "}
                <button className="text-sm ms-2 text-main font-medium" type="button" onClick={addAddress}>
                  <CgMathPlus className="inline me-1" />
                  Add Address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <button className="mt-10 w-full bg-black py-2 rounded-md text-white">Continue</button>
    </form>
  );
}
