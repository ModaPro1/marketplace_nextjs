export default function ProductsSkeleton() {
  return (
    <div className="animate-pulse mt-10 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-5 md:gap-10">
      {new Array(8).fill("").map((_, index) => {
        return (
          <div key={index}>
            <div className="bg-gray-200 h-48 md:h-56"></div>
            <div className="bg-gray-200 w-full h-6 mt-5"></div>
          </div>
        );
      })}
    </div>
  );
}
