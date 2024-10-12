export default function ProductPageSkeleton() {
  return (
    <div className="flex mt-10 gap-10 flex-col md:flex-row animate-pulse">
      <div className="sm:w-[60%] md:w-[50%]">
        <div className="w-full bg-gray-200 h-72 md:h-96"></div>
        <div className="flex gap-[10px] mt-[10px]">
          <div className="bg-gray-200 h-[60px] w-[60px] md:w-[100px] md:h-[100px]"></div>
          <div className="bg-gray-200 h-[60px] w-[60px] md:w-[100px] md:h-[100px]"></div>
          <div className="bg-gray-200 h-[60px] w-[60px] md:w-[100px] md:h-[100px]"></div>
        </div>
      </div>
      <div className="flex-1">
        <div className="w-full h-6 bg-gray-200"></div>
        <div className="mt-4 w-full h-44 bg-gray-200"></div>
        <div className="w-full h-6 bg-gray-200 mt-4"></div>
        <div className="w-full h-6 bg-gray-200 mt-4"></div>
      </div>
    </div>
  );
}
