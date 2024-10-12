import { ImSpinner8 } from "react-icons/im";

export default function DashboardSpinner() {
  return (
    <div className="w-full h-full flex justify-center items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <ImSpinner8 className="animate-spin text-4xl text-main" />
    </div>
  );
}
