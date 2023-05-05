import { memo } from "react";
function Payment({ cart, handleRemoveCart, show }) {
  return (
    <ul
      className={`absolute top-6 -left-80 mt-2 p-2 w-96 bg-vintagePaper-0 rounded-lg shadow-xl text-black text-left ${
        show ? "" : "hidden"
      }`}
    >
      <li className="grid grid-cols-6 border-y-2 border-x-2 border-black p-2 text-xs text-orange-500">
        <div className=" col-start-1 col-span-3  ">Product</div>
        <div className=" col-start-4 border-x-2 border-black text-center">
          No
        </div>
        <div className=" col-start-5 col-span-2 text-center">Price</div>
      </li>
      {cart.map((product, index) => (
        <li
          className="grid grid-cols-6  border-b-2 border-x-2 border-black p-2"
          key={index}
        >
          <div className=" col-start-1 col-span-3 text-xs ">
            {product.title}
          </div>
          <div className=" col-start-4 border-x-2 border-black text-center">
            {product.quantity}
          </div>
          <div className=" col-start-5 col-span-2 text-center">
            {product.price}${" "}
            <span
              className=" border border-black shadow-sm shadow-black bg-old-0 select-none inline-flex justify-center items-center w-8 text-center"
              onClick={() => handleRemoveCart(cart.filter(pd=>pd!==product))}
            >
              X
            </span>
          </div>
        </li>
      ))}
      <li className=" my-2">
        Total: {cart.reduce((prev, cur) => prev + cur.price, 0)}$
      </li>
      <li className="bg-red-500 border-4 border-white text-white text-sm p-2 text-center select-none"
       onClick={()=>handleRemoveCart([])}>Payment</li>
    </ul>
  );
}

export default memo(Payment);
