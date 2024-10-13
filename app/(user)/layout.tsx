import MainNavbar from "@/components/User/Navbar";
import { CartContextProvider } from "@/context/UserCartContext";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer />
      <CartContextProvider>
        <MainNavbar />
        {children}
      </CartContextProvider>
    </>
  );
}
