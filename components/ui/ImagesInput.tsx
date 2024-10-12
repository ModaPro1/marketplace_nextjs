import { ChangeEvent, useRef } from "react";
import { FieldError } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ImagesInput(props: {
  classes?: string;
  data?: string[];
  placeholder?: string;
  name: string;
  label: string;
  error: FieldError | undefined;
  images: File[];
  onChange: (updatedImages: File[]) => void
}) {
  const fileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      if (!selectedFile) return;

      // Handle image limit
      const currentImages = props.images;
      if (currentImages.length >= 4) {
        toast.error("You can only upload up to 4 images.");
        return;
      }

      const updatedImages = [...currentImages, selectedFile];
      props.onChange(updatedImages)
    }
  };

  const removeImage = (imageIndex: number) => {
    const currentImages = props.images;
    const updatedImages = currentImages.filter((_, index) => index !== imageIndex);
    props.onChange(updatedImages)
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="input-box col-span-2 relative">
      <label htmlFor={props.label} className={`mb-1 font-medium ${props.error ? "text-red-700" : ""}`}>
        {props.label}
      </label>
      <div>
        <input type="file" hidden id={props.label} ref={fileInputRef} onChange={fileInputChange} />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-xs bg-main py-1 px-2 text-white mt-2 rounded-md focus:outline-main"
        >
          Add Image
        </button>

        {props.images.length > 0 && (
          <div className="preview pt-2 flex gap-2">
            {props.images.map((imageFile, index) => (
              <div className="relative" key={index}>
                <button
                  type="button"
                  className="absolute top-2 right-2 text-red-600"
                  onClick={() => removeImage(index)}
                >
                  <FaTrashAlt />
                </button>
                <img src={URL.createObjectURL(imageFile)} alt="New Image" className="w-20" />
              </div>
            ))}
          </div>
        )}
      </div>

      {props.error && <div className="text-red-700 mt-2 absolute -top-1 right-0 text-sm">{props.error.message}</div>}
    </div>
  );
}
