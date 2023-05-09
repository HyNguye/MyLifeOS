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
      className=" w-52 h-fit bg-old-0 border border-black absolute top-1 left-10 z-10"
      ref={ref}
    >
      <li className="p-2" onClick={handleDelete}>
        Delete
      </li>
    </ul>
  );
}

export default memo(Options);
