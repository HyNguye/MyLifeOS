
import { memo } from "react";
function CategoriesBtn({children,isActive,handleClick}) {
  return (
    <button
      className={
        "rounded capitalize p-2 m-1 shadow-black shadow-md border-2 border-white hover:bg-opacity-40 " +
        `${isActive ? " text-amber-950 bg-white bg-opacity-100" : " bg-brownLayout-0  text-white "}`
      }
      onClick={()=>handleClick(children)}
      
    >
      {children}
    </button>
  );
}

export default memo(CategoriesBtn);
