import { memo } from "react";
function Product({ product,handleClick ,id}) {
  return (
    <div className={`text-black w-72 h-96 p-4 flex flex-col rounded border
     border-black shadow-md shadow-black justify-between overflow-hidden items-center select-none
     active:opacity-60 ${id===product.id?' bg-orange-200':' bg-vintagePaper-0'}`}
     
     onClick={()=>handleClick(product)}>
      <div className="text-sm text-center text-green-900">{product.title}</div>
      <img src={product.image} alt="" className=" w-full h-48 object-fill select-none" />
      <div className="self-end text-green-900">{product.price} $</div>
    </div>
  );
}

export default memo(Product);
