"use client";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { addUserAddress, deleteUserAddress } from "@/actions/user";
import { useRouter } from "next/navigation";
import { TiDelete } from "react-icons/ti";

export async function addAddressModal() {
  let addedAddressData
  const result = await Swal.fire({
    title: "Add shipping address",
    html: `
      <div>
        <label for='country' class='text-left block mb-1'>Country Name</label>
        <input id="country" class="swal2-input m-0 w-full" placeholder='Enter your country name'>
      </div>

      <div class='mt-3'>
        <label for='address' class='text-left block mb-1'>Address</label>
        <textarea id='address' placeholder='Enter your address in details' class='swal2-textarea m-0 w-full resize-none'></textarea>
      </div>
    `,
    confirmButtonColor: "#009688",
    confirmButtonText: "Add address",
    showCancelButton: true,
    showCloseButton: true,
    reverseButtons: true,
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      const country = (document.getElementById("country") as HTMLInputElement).value;
      const address = (document.getElementById("address") as HTMLTextAreaElement).value;
      if (!country || !address) {
        Swal.showValidationMessage("All fields are required");
        return;
      }
      const addressData = await addUserAddress({ country, address });
      addedAddressData = addressData
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
  return {...result, address: addedAddressData};
}
export default function UserShippingInfoForm({ userData }: any) {
  const router = useRouter();
  
  async function addAddress() {
    const result = await addAddressModal();

    if (result.isConfirmed) {
      toast.success("Shipping address added", {
        autoClose: 1000,
        position: "top-center",
        closeOnClick: true,
      });
      router.refresh();
    }
  }

  async function deleteAddress(id: string) {
    try {
      await deleteUserAddress(id);
      toast.success("Shipping address removed", {
        autoClose: 1000,
        position: "top-center",
        closeOnClick: true,
      });
    } catch (error) {
      toast.error("Error occurred", {
        autoClose: 1000,
        position: "top-center",
        closeOnClick: true,
      });
    }
    router.refresh();
  }
  return (
    <>
      {userData.shipping_infos.length > 0 ? (
        <div className="space-y-2">
          {userData.shipping_infos.map((data: { id: string; country: string; address: string }) => {
            return (
              <p className="flex items-center" key={data.id}>
                {data.country} - {data.address}
                <button className="text-red-600 ms-3 text-xl" onClick={() => deleteAddress(data.id)}>
                  <TiDelete />
                </button>
              </p>
            );
          })}
          <button className="text-sm px-2 py-1 bg-main rounded-md text-white mt-2" onClick={addAddress}>
            Add new
          </button>
        </div>
      ) : (
        <div>
          <p>You have no shipping info stored.</p>
          <button className="text-sm px-2 py-1 bg-main rounded-md text-white mt-2" onClick={addAddress}>
            Add new
          </button>
        </div>
      )}
    </>
  );
}
