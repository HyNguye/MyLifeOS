import { useState,useContext } from "react";
import {HomeContext,actions} from '~/homepage-store'
function NewText({ initInput }) {
  const [input, setInput] = useState(initInput || "");
  const [state,dispatch] = useContext(HomeContext)
  const handleSave =()=>{
    dispatch(actions.setNewFile(<NewText initInput={input}/>))
  }
  return (
    <div className="flex flex-col ">
      <textarea
        className=" w-utility h-utility font-writeByHand bg-vintagePaper-0 p-4 text-xl border-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>{" "}
      <button className="w-full bg-orange-600 border-none p-2"
      onClick={handleSave}>Save</button>
    </div>
  );
}

export default NewText;
