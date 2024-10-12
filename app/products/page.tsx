export default function ProductsPage() {
  return (
    <>
      <div className="filter pt-5 pb-10 flex justify-between">
        <div className="flex gap-5">
          <input
            type="number"
            placeholder="min price"
            className="text-xs rounded-2xl pl-3 pe-1 py-1 w-24 ring-1 ring-gray-400 focus:outline-main"
          />
          <input
            type="number"
            placeholder="max price"
            className="text-xs rounded-2xl pl-3 pe-1 py-1 w-24 ring-1 ring-gray-400 focus:outline-main"
          />
          <select className="py-2 px-4 w-[150px] rounded-2xl text-xs font-medium ring-1 ring-gray-400 focus:outline-main">
            <option>Category</option>
            <option value="home">Home applicants</option>
          </select>
        </div>
        <div>
          <select name="sort" className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400 focus:outline-main w-[150px]">
            <option>Sort By</option>
            <option value="asc price">Price (low to high)</option>
            <option value="desc price">Price (high to low)</option>
            <option value="asc lastUpdated">Newest</option>
            <option value="desc lastUpdated">Oldest</option>
          </select>
        </div>
      </div>
      <div className="products">
        <h1 className="font-semibold text-lg">All Products For You!</h1>
        <div className="products mt-10"></div>
      </div>
    </>
  );
}
