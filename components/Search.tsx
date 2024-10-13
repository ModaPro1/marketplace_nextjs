import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { debounce } from "lodash";

export default function NavbarSearch() {
  const params = useSearchParams();
  const [searchInputState, setSearchInputState] = useState(params.get('s') || '');
  const router = useRouter();

  function search(value: string) {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("s", value);
    const newPathname = `/products?${currentParams.toString()}`;
    router.push(newPathname);
  }

  const searchInput = useCallback(
    debounce((value: string) => {
      search(value);
    }, 500),
    [router]
  );

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    search(searchInputState);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInputState(value);
    searchInput(value);
  };

  const clearSearch = () => {
    setSearchInputState('');
    search('');
  };

  return (
    <form className="relative flex-1" onSubmit={submitForm}>
      <input
        type="text"
        className="bg-gray-100 px-2 py-1 rounded-md w-full focus:outline-none"
        placeholder="Search"
        value={searchInputState}
        onChange={handleChange}
      />
      {searchInputState ? (
        <IoMdClose onClick={clearSearch} className="absolute right-2 top-[50%] translate-y-[-50%] text-lg cursor-pointer" />
      ) : (
        <IoIosSearch className="absolute right-2 top-[50%] translate-y-[-50%] text-lg" />
      )}
    </form>
  );
}
