"use client";

import { useFormState } from "react-dom";
import FormButton from "./FormButton";
import InputBox from "./InputBox";
import SelectBox from "./SelectBox";

export interface InputProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  accept?: string;
  data?: string[];
  classes?: string;
  multiple?: boolean;
  value?: string
}

interface Props {
  inputs: InputProps[];
  formClasses?: string;
  buttonText: string;
  action: (formState: any, formData: FormData) => Promise<any>;
}

export default function Form(props: Props) {
  const [state, formAction] = useFormState(props.action, {});

  return (
    <form action={formAction}>
      <div className={props.formClasses || ""}>
        {props.inputs.map((input) => {
          const inputError = state?.errors ? state.errors[input.name] : false;
          if (input.type == "select") {
            return (
              <SelectBox
                key={input.name}
                label={input.label}
                error={inputError}
                name={input.name}
                classes={input.classes}
                data={input.data!}
                placeholder={input.placeholder || 'Choose'}
              />
            );
          } else {
            return (
              <InputBox
                key={input.name}
                label={input.label}
                error={inputError}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                classes={input.classes}
                {...(input.value && { value: input.value })}
                />
            );
          }
        })}
      </div>
      <FormButton classes="mt-5">{props.buttonText}</FormButton>
    </form>
  );
}
