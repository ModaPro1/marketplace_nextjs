export default function FilterSkeleton() {
  return (
    <div className="pt-5 pb-5 px-[1px] mb-5 flex animate-pulse justify-between overflow-y-auto">
      <div className="flex">
        <div className="h-8 w-24 bg-gray-200 rounded-full me-3"></div>
        <div className="h-8 w-24 bg-gray-200 rounded-full me-[90px]"></div>
        <div className="h-8 w-40 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-8 w-[150px] bg-gray-200 rounded-full"></div>
    </div>
  );
}
