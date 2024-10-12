import { FieldError } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function OptionsInput(props: {
  error: FieldError;
  options: { name: string; price: number }[];
  onChange: (updated: { name: string; price: number }[]) => void;
}) {
  const addProductOption = async () => {
    const { value: optionName } = await Swal.fire({
      icon: "info",
      title: "Enter the option's name",
      input: "text",
      inputPlaceholder: "Medium Black",
      confirmButtonColor: "#009688",
      confirmButtonText: "Next",
      showCloseButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Please enter the option's name";
        }
      },
    });

    if (optionName) {
      const { value: optionAdditionalPrice } = await Swal.fire({
        icon: "info",
        title: "Enter the option's additional price",
        input: "number",
        inputValue: 0,
        inputPlaceholder: "Additional price can be 0",
        confirmButtonColor: "#009688",
        confirmButtonText: "Next",
        showCloseButton: true,
        inputValidator: (value) => {
          if (isNaN(+value)) {
            return "Please enter the option's additional price";
          }
        },
      });

      if (optionAdditionalPrice !== undefined) {
        const currentOptions = props.options;
        const updatedOptions = [...currentOptions, { name: optionName, price: +optionAdditionalPrice }];
        props.onChange(updatedOptions)
      }
    }
  };

  const removeOption = (index: number) => {
    const currentOptions = props.options;
    const updatedOptions = currentOptions.filter((_, optionIndex) => optionIndex !== index);
    props.onChange(updatedOptions)
  };

  return (
    <div className="product-options col-span-2">
      <label className={`mb-1 font-medium ${props.error ? "text-red-700" : ""}`}>
        Product Options <span className="text-xs text-gray-500">(optional)</span>
      </label>
      <div className="flex gap-2 mt-2 items-start">
        {props.options.length > 0 && (
          <div className="flex gap-2 flex-wrap text-xs">
            {props.options.map((option, index) => (
              <div key={index} className="py-1 px-2 border border-gray-800 rounded-md flex items-center">
                {option.name} - ${option.price}
                <button type="button" className="ms-2" onClick={() => removeOption(index)}>
                  <FaTrashAlt className="text-red-800" />
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={addProductOption}
          className="text-xs bg-main py-1 px-2 text-white rounded-md focus:outline-main"
        >
          Add Option
        </button>
      </div>
    </div>
  );
}
