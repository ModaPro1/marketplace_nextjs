"use client";
import BreadCrumb from "@/components/Merchant/BreadCrumb";
import DashboardSpinner from "@/components/Merchant/DashboardSpinner";
import NotificationIcon from "@/components/Merchant/NotificationIcon";
import { SidebarContext } from "@/context/MerchantSidebarContext";
import { useContext, useEffect } from "react";

export default function NotificationsPage() {
  const { notifications, isLoading, markAllAsRead } = useContext(SidebarContext);

  useEffect(() => {
    markAllAsRead();
  }, []);

  return (
    <>
      <BreadCrumb current="Notifications" classes="mb-5" />
      {isLoading && <DashboardSpinner />}
      {(!isLoading &&
        notifications.length > 0) &&
        notifications.map((notification) => {
          return (
            <div
              key={notification.id}
              className="flex gap-4 text-slate-700 bg-white p-3 rounded-sm shadow mb-3 relative"
            >
              <div className="icon mt-[2px] text-xl">
                <NotificationIcon notificationType={notification.type} />
              </div>
              <div className="flex-1">
                <div className="text-sm flex justify-between items-center">
                  {notification.message}
                  {!notification.isRead && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 mt-1">{new Date(notification.createdAt).toDateString()}</div>
              </div>
            </div>
          );
        })}

      {(!isLoading && notifications.length == 0) && <p className="text-slate-700">You have no notifications yet.</p>}
    </>
  );
}
