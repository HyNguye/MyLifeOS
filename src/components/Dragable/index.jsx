import { useContext, useEffect, useState } from "react";
import { AppContext,actions } from "../Application/app-store";

function Draggable({ children, zIndex,appName }) {
  const [state, dispatch] = useContext(AppContext);
  const [privatePositionState,setPrivatePositionState] = useState({
    nameApp: appName,
    
     //Drag feature
     dragInitialPosition: { x: 0, y: 0 },
     dragPosition: { x: 0, y: 0 },
     
  })
  useEffect(()=>{
    dispatch(actions.setInitialPosition(privatePositionState.dragInitialPosition))
    dispatch(actions.setPosition(privatePositionState.dragPosition))
  },[])
  useEffect(()=>{
    if(appName=== state.nameApp){
    setPrivatePositionState(prev=>({...prev,dragPosition:state.dragPosition,dragInitialPosition:state.dragInitialPosition}))
    }
  },[state.dragPosition])
  function handleMouseDown(event) {
    dispatch(actions.dragging(true));
    dispatch(
      actions.setInitialPosition({
        x: event.screenX - privatePositionState.dragPosition.x,
        y: event.screenY - privatePositionState.dragPosition.y,
      })
    );
  }
  
 
  return (
    <div
      style={{
        transform: `translate(${privatePositionState.dragPosition.x}px, ${privatePositionState.dragPosition.y}px )`,
        zIndex: `${zIndex}`,
      }}
      onMouseDown={handleMouseDown}
      
      className="absolute top-9  border"
    >
      {children}
    </div>
  );
}
export default Draggable;
