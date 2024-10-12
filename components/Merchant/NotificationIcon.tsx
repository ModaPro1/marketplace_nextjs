import { BsCart2 } from "react-icons/bs";
import { PiUserCheck, PiWarningCircle } from "react-icons/pi";

export default function NotificationIcon({notificationType}: {notificationType: string}) {
  return (
    <>
      {notificationType == "NEW_ORDER" && <BsCart2 />}
      {notificationType == "ACCOUNT_ACTIVATION" && <PiUserCheck />}
      {notificationType == "OTHER" && <PiWarningCircle fontSize={19} />}
    </>
  );
}
