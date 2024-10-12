import { HiOutlineMinusSmall, HiOutlinePlusSmall } from "react-icons/hi2";

export default function ItemQuantity({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  function minusQuantity() {
    if(quantity >= 1) {
      onChange(quantity - 1)
    }
  }

  function addQuantity() {
    onChange(quantity + 1)
  }

  return (
    <div className="flex gap-2">
      <button
        className="bg-gray-200 rounded-full w-5 h-5 flex justify-center items-center disabled:opacity-70"
        onClick={minusQuantity}
        disabled={quantity == 1}
      >
        <HiOutlineMinusSmall fontSize={14} />
      </button>
      <div>{quantity}</div>
      <button className="bg-gray-200 rounded-full w-5 h-5 flex justify-center items-center" onClick={addQuantity}>
        <HiOutlinePlusSmall fontSize={14} />
      </button>
    </div>
  );
}
