import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { debounce } from "lodash";

export default function NavbarSearch() {
  const params = useSearchParams()
  const [searchInputState, setSearchInputState] = useState(params.get('s') || '')
  const router = useRouter();

  const searchInput = useCallback(
    debounce((value: string) => {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set("s", value);
      const newPathname = `/products?${currentParams.toString()}`;
      router.push(newPathname);
    }, 500),
    [router]
  );

  // Handle change event
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputState(e.target.value)
    searchInput(e.target.value);
  };

  return (
    <form className="relative flex-1">
      <input
        type="text"
        className="bg-gray-100 px-2 py-1 rounded-md w-full focus:outline-none"
        placeholder="Search"
        value={searchInputState}
        onChange={handleChange} // Use the handleChange function
      />
      <IoIosSearch className="absolute right-2 top-[50%] translate-y-[-50%] text-lg " />
    </form>
  );
}
