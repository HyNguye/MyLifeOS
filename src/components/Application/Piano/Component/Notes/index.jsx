import { useEffect, useRef } from "react";

function Note({ setting, children }) {
    const ref = useRef()
    const handleMouseDown = () =>{
        ref.current.play()
    }
    const handleMouseUp = () =>{
        ref.current.load()
    }
  return (
    <button
      
      className={
        setting.keyNote.includes("#")
          ? `absolute bg-black w-10 h-1/2 -translate-x-5 text-white text-xs pt-20 active:bg-slate-700 ${/^[0-9]+$/.test(setting.keyboardKey)?'note'+setting.keyboardKey:setting.keyboardKey}`
          : `bg-white w-14 h-full border border-black text-xs pt-80 active:bg-slate-200 ${/^[0-9]+$/.test(setting.keyboardKey)?'note'+setting.keyboardKey:setting.keyboardKey}`
      }
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <audio id={/^[0-9]+$/.test(setting.keyboardKey)?'note'+setting.keyboardKey:setting.keyboardKey} ref={ref} src={setting.audioSrc}></audio>
      {children}
    </button>
  );
}

export default Note;
