import { AppContext, actions } from "@app/app-store";
import { useContext, useEffect } from "react";

function Application({ children ,index}) {
  const [state, dispatch] = useContext(AppContext);
  useEffect(()=>{
    dispatch(actions.setCurrentApp(children.type.displayName+index));
    
  },[])
  const handlePriority = () => {
    dispatch(actions.setCurrentApp((children.type.displayName||'') + index));
    
  };
  return (
    <div
      className=" border-black border-4 w-fit max-w-screen min-w-fit max-h-fitScreen overflow-scroll 
      flex flex-col"
    >
      <div className=" h-7 max-w-screen min-w-utility bg-black text-white flex gap-0 sticky top-0">
        <div
          className="text-sm text-white text-left bg-black  w-full p-1"
          onClick={handlePriority}
          onMouseDown={handlePriority}
        >
          {(children.type.displayName||'') + index}
        </div>
        <div
          className="w-7 bg-white text-black p-2 flex justify-center items-center border-black border-b-4"
          onClick={() => dispatch(actions.closeApp(children))}
        >
          X
        </div>
      </div>
      <div className="w-fit h-fit" onClick={handlePriority} onMouseDown={handlePriority}>
        {children}
      </div>
    </div>
  );
}

export default Application;
