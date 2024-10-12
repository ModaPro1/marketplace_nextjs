import MainNavbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
}
