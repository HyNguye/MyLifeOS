import { useState, useEffect, useRef} from "react";
import AudioSrc from "./AudioSrc";

import Note from "./Component/Notes";
function Piano() {
  const pianoRef = useRef()
  const [keyboardTheme, setKeyBoardTheme] = useState(false);
  useEffect(()=>{
    pianoRef.current.focus()
  },[])
  const handleKeyDown = (e)=>{
     let myEvent =/^[0-9]+$/.test(e.key)?'note' +e.key: e.key
    
    if (notes.find((note) => note.keyboardKey === e.key)) {
      document.querySelector(`#${myEvent}`).play();
      document.querySelector(`.${myEvent}`).style.backgroundColor = 'grey'
    }
  }
  const handleKeyUp = (e)=>{
    let myEvent =/^[0-9]+$/.test(e.key)?'note' +e.key: e.key
    
    if (notes.find((note) => note.keyboardKey === e.key)) {
      document.querySelector(`#${myEvent}`).load();
      document.querySelector(`.${myEvent}`).style.backgroundColor= 
      (notes.find(note=>(note.keyNote.includes('#')&&note.keyboardKey===e.key))?'black':'white')
    }
  }
  const handleFocus = (e) => {
    window.removeEventListener('keydown',handleKeyDown)
    window.removeEventListener('keyup',handleKeyUp)
    window.addEventListener('keydown',handleKeyDown)
    window.addEventListener('keyup',handleKeyUp)
  
  };
  const handleBlur= (e) => {
    window.removeEventListener('keydown',handleKeyDown)
    window.removeEventListener('keyup',handleKeyUp)
  
  };

  const notes = [
    {
      keyNote: "F2",
      audioSrc: AudioSrc.key01,
      keyboardKey: "z",
    },
    {
      keyNote: "F#2",
      audioSrc: AudioSrc.key02,
      keyboardKey: "s",
    },
    {
      keyNote: "G2",
      audioSrc: AudioSrc.key03,
      keyboardKey: "x",
    },
    {
      keyNote: "G#2",
      audioSrc: AudioSrc.key04,
      keyboardKey: "d",
    },
    {
      keyNote: "A2",
      audioSrc: AudioSrc.key05,
      keyboardKey: "c",
    },
    {
      keyNote: "A#2",
      audioSrc: AudioSrc.key06,
      keyboardKey: "f",
    },
    {
      keyNote: "B2",
      audioSrc: AudioSrc.key07,
      keyboardKey: "v",
    },
    {
      keyNote: "C3",
      audioSrc: AudioSrc.key08,
      keyboardKey: "q",
    },
    {
      keyNote: "C#3",
      audioSrc: AudioSrc.key09,
      keyboardKey: "2",
    },
    {
      keyNote: "D3",
      audioSrc: AudioSrc.key10,
      keyboardKey: "w",
    },
    {
      keyNote: "D#3",
      audioSrc: AudioSrc.key11,
      keyboardKey: "3",
    },
    {
      keyNote: "E3",
      audioSrc: AudioSrc.key12,
      keyboardKey: "e",
    },
    {
      keyNote: "F3",
      audioSrc: AudioSrc.key13,
      keyboardKey: "r",
    },
    {
      keyNote: "F#3",
      audioSrc: AudioSrc.key14,
      keyboardKey: "5",
    },
    {
      keyNote: "G3",
      audioSrc: AudioSrc.key15,
      keyboardKey: "t",
    },
    {
      keyNote: "G#3",
      audioSrc: AudioSrc.key16,
      keyboardKey: "6",
    },
    {
      keyNote: "A3",
      audioSrc: AudioSrc.key17,
      keyboardKey: "y",
    },
    {
      keyNote: "A#3",
      audioSrc: AudioSrc.key18,
      keyboardKey: "7",
    },
    {
      keyNote: "B3",
      audioSrc: AudioSrc.key19,
      keyboardKey: "u",
    },
    {
      keyNote: "C4",
      audioSrc: AudioSrc.key20,
      keyboardKey: "i",
    },
    {
      keyNote: "C#4",
      audioSrc: AudioSrc.key21,
      keyboardKey: "9",
    },
    {
      keyNote: "D4",
      audioSrc: AudioSrc.key22,
      keyboardKey: "o",
    },
    {
      keyNote: "D#4",
      audioSrc: AudioSrc.key23,
      keyboardKey: "0",
    },
    {
      keyNote: "E4",
      audioSrc: AudioSrc.key24,
      keyboardKey: "p",
    },
  ];

  return (
    <div className="piano w-fit h-fit" tabIndex={-1} onFocus={handleFocus} onBlur={handleBlur} ref={pianoRef} onClick={()=>pianoRef.current.focus()}>
      <div className=" h-12 bg-black flex justify-between items-center">
        <div>
          <button
            onClick={() => setKeyBoardTheme((prev) => !prev)}
            className="border border-black rounded bg-vintagePaper-0 hover:bg-white ml-4 p-1"
          >
            Show notes
          </button>
        </div>
        <div className=""></div>
        <div className=""></div>
      </div>
      <div className="relative w-fit h-96 ">
        {notes.map((note) => (
          <Note key={note.keyNote} setting={note}>
            {keyboardTheme ? note.keyNote : note.keyboardKey}
          </Note>
        ))}
      </div>
    </div>
  );
}
Piano.displayName = 'Piano'
export default Piano;
