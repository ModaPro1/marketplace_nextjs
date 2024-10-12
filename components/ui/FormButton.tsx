import clsx from "clsx";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { ImSpinner9 } from "react-icons/im";

export default function FormButton({ children, classes, loading }: { children: ReactNode, classes?: string, loading?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx(`bg-main text-white py-2 w-full rounded-md tracking-wide transition ${classes || ''}`, {
        "opacity-70 cursor-default": pending || loading,
      })}
    >
      {(pending || loading) && <ImSpinner9 className="inline me-2 animate-spin" />}
      {children}
    </button>
  );
}
