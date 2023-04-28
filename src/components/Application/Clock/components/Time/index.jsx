import { useEffect, useState } from "react";

function TimeClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const myTimer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(myTimer);
    };
  }, []);
  return (
    <div className="w-full h-80 flex justify-center items-center ">
      <div className=" bg-slate-950 p-11 text-4xl text-blue-400">
        {time.getHours() +
          ":" +
          (time.getMinutes() < 10
            ? "0" + time.getMinutes()
            : time.getMinutes()) +
          ":" }<span className=" text-orange-300">
          {time.getSeconds() < 10
            ? "0" + time.getSeconds()
            : time.getSeconds()}</span>
      </div>
    </div>
  );
}

export default TimeClock;
