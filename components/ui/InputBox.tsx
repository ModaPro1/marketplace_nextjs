import clsx from "clsx";
import { ChangeEvent } from "react";

export default function InputBox(props: {
  classes?: string;
  data?: string[];
  placeholder?: string;
  name: string;
  type: string;
  label: string;
  error: string | null;
  value?: string | number;
  labelClasses?: string;
  inputClasses?: string;
  required?: boolean;
  inputChange?: (key: string, value: string) => void;
}) {
  function changeInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if(props.inputChange) {
      props.inputChange(props.name, e.target.value)
    }
  }
  return (
    <div className={`input-box relative ${props.classes || ""}`}>
      <label htmlFor={props.label} className={`mb-1 font-medium ${props.labelClasses} ${props.error ? "text-red-700" : ""}`}>
        {props.label}
      </label>

      {props.type == "textarea" ? (
        <textarea
          id={props.label}
          value={props.value}
          name={props.name}
          onChange={changeInput}
          placeholder={props.placeholder}
          rows={5}
          className={`${props.error ? "main-input-error" : "main-input"} resize-none`}
        ></textarea>
      ) : (
        <input
          id={props.label}
          type={props.type}
          value={props.value}
          name={props.name}
          onChange={changeInput}
          placeholder={props.placeholder}
          className={clsx('main-input', {
            'main-input-error': props.error,
            'input-file': props.type == 'file',
          }, props.inputClasses || '')}
          required={props.required}
        />
      )}
      {props.error && <div className="text-red-700 mt-2 absolute -top-1 right-0 text-sm">{props.error}</div>}
    </div>
  );
}
