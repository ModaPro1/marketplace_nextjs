import { ReactNode } from "react";

export default function UserContainerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#f4f5f7]">
      <div className="custom-container pt-16 pb-10 min-h-[100vh]">{children}</div>
    </div>
  );
}
