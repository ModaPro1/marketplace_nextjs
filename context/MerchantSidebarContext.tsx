"use client";

import { getMerchantNotifications, markNotificationsAsRead } from "@/actions/merchant";
import { MerchantNotification } from "@prisma/client";
import { createContext, ReactNode, useEffect, useState } from "react";

interface ContextType {
  menuIsOpen: boolean;
  toggleMenu: () => void;
  notifications: MerchantNotification[];
  setNotifications: (notifications: MerchantNotification[]) => void;
  hasUnread: boolean;
  markAllAsRead: () => void;
  isLoading: boolean
}

export const SidebarContext = createContext<ContextType>({
  menuIsOpen: true,
  toggleMenu: () => {},
  notifications: [],
  setNotifications: () => {},
  hasUnread: false,
  markAllAsRead: () => {},
  isLoading: true
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const [notifications, setNotifications] = useState<MerchantNotification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const data = await getMerchantNotifications()
      setNotifications(data)
      setIsLoading(false)
    }
    getData()
  }, [])

  useEffect(() => {
    setHasUnread(notifications.some((notification) => !notification.isRead));
  }, [notifications]);

  const toggleMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  const markAllAsRead = async () => {
    // set the state
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );

    // updating in the db
    await markNotificationsAsRead()
  };

  return (
    <SidebarContext.Provider
      value={{
        menuIsOpen,
        toggleMenu,
        notifications,
        setNotifications,
        hasUnread,
        markAllAsRead,
        isLoading
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
