import { useState, useEffect, useContext } from "react";
import { AppContext,actions } from "../../../app-store";
import Clock from "../..";
function ClockMini() {
 const [state,dispatch] = useContext(AppContext);
  const [time, setTime] = useState(new Date());
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    const myTimer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(myTimer);
    };
  }, []);
  return (
    <button onClick={()=>dispatch(actions.setRunningAppsList(<Clock/>))} className=" w-64 text-xs text-right p-4">
      {daysOfWeek[time.getDay()] +
        " " +
        time.getDate() +
        " " +
        monthsOfYear[time.getMonth()] +
        " " +
        (time.getHours()<10?'0'+time.getHours():time.getHours()) +
        ":" +
        (time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes())}
    </button>
  );
}

export default ClockMini;
