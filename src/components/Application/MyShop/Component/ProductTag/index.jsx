import { memo, useRef } from "react";
function Product({ product, handleClick, id, root, isLastPd,handleProductList,index }) {
  const observer = useRef();
  const handleInfiniteScroll = (lastNode) => {
     if(observer.current){observer.current.disconnect()}
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            handleProductList(index)
          }
         },
        {  root: root.current ,threshold:0.75}

      );
       if(lastNode){ observer.current.observe(lastNode);
        }
    
  };
  return (
    <div
      ref={isLastPd ? handleInfiniteScroll : null}
      className={`text-black w-72 h-96 p-4 flex flex-col rounded border
     border-black shadow-md shadow-black justify-between overflow-hidden items-center select-none
     active:opacity-60 ${
       id === index ? " bg-orange-200" : " bg-vintagePaper-0"
     }`}
      onClick={() => handleClick(product)}
    >
      <div className="text-sm text-center text-green-900">{product.title}</div>
      <img
        src={product.image}
        alt=""
        className=" w-full h-48 object-fill select-none"
      />
      <div className="self-end text-green-900">{product.price} $</div>
    </div>
  );
}

export default memo(Product);
