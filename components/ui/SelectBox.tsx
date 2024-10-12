import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export default function SelectBox(props: {
  classes?: string;
  data: string[];
  name: string;
  placeholder: string;
  label: string;
  error: FieldError | undefined;
  value?: string | number;
  inputChange?: (key: string, value: string) => void;
  register?: UseFormRegisterReturn;
}) {
  return (
    <div className={`input-box relative ${props.classes || ""}`}>
      <label htmlFor={props.label} className={`mb-1 font-medium ${props.error ? "text-red-700" : ""}`}>
        {props.label}
      </label>

      <select
        id={props.label}
        className={`${props.error ? "main-input-error" : "main-input"}`}
        value={props.value}
        {...props.register}
      >
        <option value="">{props.placeholder}</option>
        {props.data.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {props.error && <div className="text-red-700 mt-2 absolute -top-1 right-0 text-sm">{props.error.message}</div>}
    </div>
  );
}
