import MainNavbar from "@/components/User/Navbar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
}
