"use client";

import Link from "next/link";
import { signout } from "@/actions/auth";
import Dropdown from "../ui/Dropdown";
import { LuUser2 } from "react-icons/lu";
import { GrPowerShutdown } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { useContext } from "react";
import { SidebarContext } from "@/context/MerchantSidebarContext";
import { FaRegBell } from "react-icons/fa";
import NotificationIcon from "./NotificationIcon";

export default function MerchantNavbar({
  user,
}: {
  user: {
    id: string;
    email: string;
    store_name: string;
    store_image: string;
  } | null;
}) {
  if (!user) {
    return;
  }
  const {
    hasUnread,
    markAllAsRead,
    toggleMenu,
    notifications,
  } = useContext(SidebarContext);

  return (
    <nav className="py-3 px-4 flex justify-between items-center bg-white shadow-sm border-b fixed w-full sm:w-[calc(100%_-_16rem)] z-40">
      <button onClick={toggleMenu} className="sm:hidden">
        <RxHamburgerMenu fontSize={30} className="border p-[2px]" />
      </button>
      <div className="ms-auto flex gap-5 items-center">
        <Dropdown
          onOpen={markAllAsRead}
          icon={
            <div className="w-8 h-8 rounded-full flex justify-center items-center bg-slate-100 text-slate-700 border">
              <FaRegBell fontSize={18} />
            </div>
          }
          showPing={hasUnread}
        >
          <div className="pt-3 min-w-72">
            <div className="px-3 pb-1.5 border-b">
              <h6 className="text-slate-600 text-sm">Notifications</h6>
            </div>
            <div className="mt-0 divide-y">
              {notifications.length > 0 ? (
                <>
                  {notifications.slice(0, 3).map((notification) => {
                    return (
                      <div className={`px-3 py-2`} key={notification.id}>
                        <div className="flex gap-2 text-slate-700">
                          <div className="icon mt-[2px] text-lg">
                            <NotificationIcon notificationType={notification.type} />
                          </div>
                          <div>
                            <div className="text-sm">{notification.message}</div>
                            <div className="text-xs text-slate-400 mt-1">
                              {new Date(notification.createdAt).toDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <Link
                    href="/merchant_dashboard/notifications"
                    className="hover:bg-gray-100 text-slate-600 px-3 py-2 text-sm flex gap-2 justify-center items-center"
                  >
                    <FaRegBell />
                    All Notifictions
                  </Link>
                </>
              ) : (
                <p className="text-sm px-3 text-slate-400">You have no notifications.</p>
              )}
            </div>
          </div>
        </Dropdown>
        <Dropdown
          icon={
            <img
              src={user.store_image}
              alt="Merchant Store Image"
              width={100}
              className="rounded-full object-cover w-11 h-w-11"
            />
          }
        >
          <div className="p-3 w-[180px] space-y-2 text-sm">
            <h6 className="pb-1.5 mb-1.5 border-b font-medium">{user.store_name}</h6>
            <Link href="/merchant_dashboard/profile" className="text-gray-600 hover:text-main transition">
              <LuUser2 className="inline me-2" />
              My Profile
            </Link>
            <form action={signout} className="text-gray-600 hover:text-main transition">
              <button>
                <GrPowerShutdown className="inline me-2" />
                Logout
              </button>
            </form>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
}
