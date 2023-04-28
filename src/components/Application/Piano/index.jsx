import { useState,useEffect } from "react";
function Piano() {
    const [monitor,setMonitor] = useState('');
    useEffect(()=>{
      const arr = ['Q','W','E','A','S','D','Z','X','C']
      const handleKeypress = (e)=>{
        if (arr.includes(e.key.toUpperCase())){
        document.querySelector(`#${e.key.toUpperCase()}`).play()
        setMonitor(document.querySelector(`#${e.key.toUpperCase()}`)['src'].split('/')[5])
        }
        
      }
      window.addEventListener('keydown',handleKeypress)
      return ()=>{
        window.removeEventListener('keydown',handleKeypress)
      }
    },[])
  
    function handleAudio (e) {
      e.target.children[0].play()
      setMonitor(e.target.children[0].src.split('/')[5])
    }
    return (
      <div id="drum-machine">
        <div id="display">{monitor}</div>
        <button class="drum-pad" id='1' onClick={handleAudio}>
          <audio class='clip'
            id="Q"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
          ></audio>
          Q
        </button>
        <button class="drum-pad" id='2' onClick={handleAudio}>
          <audio class='clip'
            id="W"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
          ></audio>
          W
        </button>
        <button class="drum-pad" id='3' onClick={handleAudio}>
          <audio class='clip'
            id="E"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
          ></audio>
          E
        </button>
        <button class="drum-pad" id='4' onClick={handleAudio}>
          <audio class='clip'
            id="A"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
          ></audio>
          A
        </button>
        <button class="drum-pad"id='5' onClick={handleAudio}>
          <audio class='clip'
            id="S"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
          ></audio>
          S
        </button>
        <button class="drum-pad" id='6' onClick={handleAudio}>
          <audio class='clip'
            id="D"
            src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
          ></audio>
          D
        </button>
        <button class="drum-pad" id='7' onClick={handleAudio}>
          <audio class='clip'
            id="Z"
            src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
          ></audio>
          Z
        </button>
        <button class="drum-pad" id='8' onClick={handleAudio}>
          <audio class='clip'
            id="X"
            src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
          ></audio>
          X
        </button>
        <button class="drum-pad" id='9' onClick={handleAudio}> 
          <audio class='clip'
            id="C"
            src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
          ></audio>
          C
        </button>
      </div>
    );
}

export default Piano;