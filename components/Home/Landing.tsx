import { BiStore } from "react-icons/bi";

export default function Landing() {
  return (
    <div className="h-[100vh]">
      <div className="h-full w-full dark:bg-black bg-white bg-grid-black/[0.1] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
        <div className="intro px-10 flex justify-center flex-col text-center">
          <p className="tracking-wider text-lg md:text-xl mb-2">Sales Up to 50% off!</p>
          <h1 className="font-bold mx-auto text-3xl md:text-4xl md:w-[800px]">
            Welcome to Modastore Where <span className="text-main">Creativity Meets Commerce</span>
          </h1>
          <a href="#categories" className="w-fit mt-5 p-2.5 uppercase rounded-md font-medium text-xs md:text-sm text-white bg-black border-2 border-black mx-auto transition duration-300 hover:bg-transparent hover:text-black">
            <BiStore className="inline text-lg me-2" />
            Shop now
          </a>
        </div>
      </div>
    </div>
  );
}
