import Link from "next/link";
import { GiShoppingCart } from "react-icons/gi";

export default function MainLogo(props: { classes?: string; checkout?: boolean }) {
  return (
    <Link
      href={props.checkout ? "#" : "/"}
      className={`flex gap-2 text-lg items-center uppercase font-medium tracking-wide ${props.classes || ""}`}
    >
      <GiShoppingCart className="text-main text-3xl" />
      {props.checkout ? <span className="font-normal tracking-wider">CHECKOUT</span> : <span>MODASHOP</span>}
    </Link>
  );
}
