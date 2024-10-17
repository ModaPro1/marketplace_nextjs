import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import Dropdown from "../ui/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";
import CartDropdown from "../Cart/CartDropdown";
import { MdOutlineLogout } from "react-icons/md";
import { signout } from "@/actions/auth";

export default function UserDropdown(props: {isLoggedIn: boolean, userName: string; userHasOrders: boolean}) {
  return (
    <div className="flex gap-4">
      {props.isLoggedIn ? (
        <>
          <Dropdown rightDropdown icon={<FaRegUserCircle className="text-xl" />}>
            <div className="flex flex-col px-3 py-2 w-[180px]">
              <h5 className="text-sm font-[500] mb-3">{props.userName}</h5>
              <Link href="/profile" className="flex gap-2 items-center text-sm">
                <AiOutlineUser fontSize={17} />
                Profile
              </Link>
              {props.userHasOrders && (
                <Link href="/orders" className="flex gap-1.5 items-center text-sm mt-3">
                  <HiOutlineClipboardList fontSize={17} />
                  My Orders
                </Link>
              )}
              <button
                onClick={async () => {
                  await signout();
                }}
                className="flex gap-2 items-center text-sm border-t pt-1.5 mt-1.5"
              >
                <MdOutlineLogout fontSize={17} />
                Sign Out
              </button>
            </div>
          </Dropdown>
          <CartDropdown />
        </>
      ) : (
        <Dropdown rightDropdown icon={<FaRegUserCircle className="text-xl" />}>
          <div className="px-3 py-2 text-sm">
            <Link href="/login" className="block">
              Login
            </Link>
            <Link href="/signup" className="block mt-1.5">
              Sign up
            </Link>
          </div>
        </Dropdown>
      )}
    </div>
  );
}
