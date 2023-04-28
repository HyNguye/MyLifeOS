import { useState } from "react";
import SessionClock from "./components/Session";
import TimeClock from "./components/Time";
import utilityBG from "@asset/utility_background.png";
function Clock() {
  const [feature, setFeature] = useState(<TimeClock />);
  const [isSessionBtnClicked, setClick] = useState(false);
  const handleTimeBtn = () => {
    setFeature(<TimeClock />);
    setClick(false);
  };
  const handleSessionBtn = () => {
    setFeature(<SessionClock />)
    setClick(true);
  };
  return (
    <div
      className="clock w-utility h-utility bg-green-400 bg-blend-multiply "
      style={{ backgroundImage: `url(${utilityBG})` }}
    >
      <div className="">
        <button
          className=" p-2 w-1/2 h-full border-r-2 border-black"
          onClick={handleTimeBtn}
          style={{ backgroundColor: isSessionBtnClicked ? "#1a4428" : '' }}
        >
          Time
        </button>
        <button
          className=" p-2 w-1/2 h-full"
          onClick={handleSessionBtn}
          style={{ backgroundColor: isSessionBtnClicked ?"":"#1a4428"  }}
        >
          Session
        </button>
      </div>
      <div className="border-black border-t-4 h-fit">{feature}</div>
    </div>
  );
}

export default Clock;
