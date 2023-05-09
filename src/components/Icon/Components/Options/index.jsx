import { useEffect, useRef, useState } from "react";
import { memo } from "react";
function Options({ handleDelete, handleTurnOffOptions }) {
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleTurnOffOptions()
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <ul
      className=" bg-old-0 h-fit w-64 border-2 border-black absolute top-1 left-10 z-10"
      ref={ref}
    >
      <li className=" p-2 h-10 w-full  text-sm hover:bg-black hover:text-white" onClick={handleDelete}>
        Delete
      </li>
    </ul>
  );
}

export default memo(Options);
