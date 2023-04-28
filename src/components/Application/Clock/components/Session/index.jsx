import { useState, useEffect, useRef } from "react";
function SessionClock() {
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [start, setStart] = useState(false);
  const [breakTime, setBreakTime] = useState(5);
  const [sessionLength, setSessionLength] = useState();
  const [isBreak, setState] = useState(false);
  const handleReset = () => {
    setMin(25);
    setSec(0);
    setBreakTime(5);
    setStart(false);
    setState(false);
    setSessionLength();
    myAudio.current.pause();
    myAudio.current.load();
  };
  const handleStartStop = () => {
    setStart(!start);
    if (!start) {
      setSessionLength(min);
    }
    myAudio.current.pause();
    myAudio.current.load();
  };
  const myAudio = useRef();
  useEffect(() => {
    const timerID = setTimeout(() => {
      if (start) {
        if (sec === 0 && min === 0) {
          myAudio.current.play();
          setState(!isBreak);
          if (isBreak) {
            setMin(sessionLength);
            setSec(0);
          } else {
            setMin(breakTime);
            setSec(0);
          }
        } else if (sec === 0) {
          setMin((prev) => prev - 1);
          setSec(59);
        } else {
          setSec((prev) => prev - 1);
        }
      }
    }, 1000);
    return () => clearTimeout(timerID);
  }, [start, isBreak, min, sec]);
  return (
    <div className="p-4">
      <div className="">
        <div className="flex justify-between">
          <div id="break-label">Break Length </div>
          <div id="break-length">{breakTime}</div>
        </div>
        <div className="w-full flex justify-evenly  my-2">
          <button
            id="break-decrement"
            onClick={() => {
              if (breakTime > 1) {
                setBreakTime(breakTime - 1);
              }
            }}
            className=" w-2/5 bg-zinc-50 rounded p-px border-black border-2 hover:bg-slate-500"
          >
            &#9660;
          </button>
          <button
            id="break-increment"
            onClick={() => {
              if (breakTime < 60) {
                setBreakTime(breakTime + 1);
              }
            }}
            className="w-2/5 bg-zinc-50 rounded p-px border-black border-2 hover:bg-slate-500"
          >
            &#9650;
          </button>
        </div>
        <div className="flex justify-between">
          <div id="session-label">Session Length </div>
          <div id="session-length">{sessionLength ?? min}</div>
        </div>

        <div className="w-full flex justify-evenly  my-2">
          <button
            id="session-decrement"
            onClick={() => {
              if (min > 1) {
                setMin(min - 1);
              }
            }}
            className="w-2/5 bg-zinc-50 rounded p-px border-black border-2 hover:bg-slate-500"
          >
            &#9660;
          </button>
          <button
            id="session-increment"
            onClick={() => {
              if (min < 60) {
                setMin(min + 1);
              } else {
                setSec(0);
              }
            }}
            className="w-2/5 bg-zinc-50 rounded p-px border-black border-2 hover:bg-slate-500"
          >
            &#9650;
          </button>
        </div>
      </div>
      <div className="counterDisplay border-black border-2 text-center h-28 flex flex-col justify-around items-center my-6"
      style={{backgroundColor:`${isBreak?'#8bc34a59':'#95a3b8'}`}}>
        <div id="timer-label" className="text-xl">{isBreak ? "Break" : "Session Time"}</div>
        <div id="time-left" className="text-xl">
          {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
        </div>
      </div>
    <div className="w-full flex justify-evenly  my-2">
          <button
            id="start_stop"
            onClick={handleStartStop}
            className="w-2/5 bg-zinc-50 rounded p-px border-black border-2 hover:bg-slate-500"
          >
            {start ? "Stop" : "Start"}
          </button>
          <button
            id="reset"
            onClick={handleReset}
            className="w-2/5 bg-zinc-50 rounded p-px border-black border-2 hover:bg-slate-500"
          >
            Reset
          </button>
    </div>
      <audio
        ref={myAudio}
        id="beep"
        src="https://tiengdong.com/wp-content/uploads/Tieng-ren-ri-gai-nhat-www_tiengdong_com.mp3?_=1"
      ></audio>
    </div>
  );
}

export default SessionClock;
