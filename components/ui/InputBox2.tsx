import clsx from "clsx";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export default function InputBox2(props: {
  label: string;
  type: string;
  error: FieldError | undefined;
  classes?: string;
  placeholder?: string;
  labelClasses?: string;
  inputClasses?: string;
  register: UseFormRegisterReturn;
}) {
  return (
    <div className={`input-box relative ${props.classes || ""}`}>
      <label htmlFor={props.label} className={`mb-1 font-medium ${props.labelClasses} ${props.error ? "text-red-700" : ""}`}>
        {props.label}
      </label>

      {props.type == "textarea" ? (
        <textarea
          id={props.label}
          placeholder={props.placeholder}
          rows={5}
          className={`${props.error ? "main-input-error" : "main-input"} resize-none`}
          {...props.register}
        ></textarea>
      ) : (
        <input
          id={props.label}
          type={props.type}
          placeholder={props.placeholder}
          className={clsx('main-input', {
            'main-input-error': props.error,
            'input-file': props.type == 'file',
          }, props.inputClasses || '')}
          {...props.register}
        />
      )}
      {props.error && <div className="text-red-700 mt-2 absolute -top-1 right-0 text-sm">{props.error.message}</div>}
    </div>
  );
}
