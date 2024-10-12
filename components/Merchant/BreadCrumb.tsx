import Link from "next/link";
import { BiSolidHome } from "react-icons/bi";
import { RxSlash } from "react-icons/rx";
import { TiHome } from "react-icons/ti";

export default function BreadCrumb({
  history,
  current,
  classes
}: {
  history?: { link: string; title: string }[];
  current: string;
  classes?: string
}) {
  return (
    <div className={`flex gap-2 text-gray-500 items-center text-sm ${classes ? classes : ''}`}>
      <Link href="/merchant_dashboard" className="transition hover:text-black">
        <TiHome fontSize={18} />
      </Link>
      <RxSlash />
      {history &&
        history.map((history) => {
          return (
            <>
              <Link href={`/merchant_dashboard${history.link}`} className="hover:text-black">
                {history.title}
              </Link>
              <RxSlash />
            </>
          );
        })}
      <div>{current}</div>
    </div>
  );
}
