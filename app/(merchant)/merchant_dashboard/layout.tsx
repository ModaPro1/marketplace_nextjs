import MerchantNavbar from "@/components/Merchant/Navbar";
import MerchantSidebar from "@/components/Merchant/Sidebar";
import { SidebarProvider } from "@/context/MerchantSidebarContext";
import { getMerchantById, getSession } from "@/lib/auth";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default async function MerchantLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  const user = await getMerchantById(session.userId);

  return (
    <>
      <ToastContainer />
      <SidebarProvider>
        <div className="bg-[#f1f5f9] flex">
          <MerchantSidebar userId={session.userId} />
          <main className="min-h-[100vh] overflow-hidden w-full relative">
            <MerchantNavbar user={user}/>
            <div className="p-5 mt-16">
              {!session.merchantIsAccepted && (
                <div className="bg-slate-300 p-2 mb-5 rounded-md flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                  Your merchant account is under review and the products you add will not be shown untill your account
                  is activated
                </div>
              )}
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
