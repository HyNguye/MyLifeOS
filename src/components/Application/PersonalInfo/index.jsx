import { useEffect, useRef, useState } from "react";
import avatar from "./IMG_3539.jpeg";
import cer1 from "./Certificate1.png";
import cer2 from "./Certificate2.png";
import cer3 from "./Certificate3.png";
import cer4 from "./Certificate4.png";
import cer5 from "./Certificate5.png";
import cer6 from "./Certificate6.png";
function PersonalInfo() {
  const myCer = [cer5, cer4, cer6, cer2, cer3, cer1];
  const [certificate, setCertificate] = useState(0);
  const prevRef = useRef();
  const nextRef = useRef();
  useEffect(() => {
    nextRef.current.disabled = false;
    prevRef.current.disabled = false;
    prevRef.current.style.opacity = 1;
    nextRef.current.style.opacity = 1;
    if (certificate === 0) {
      prevRef.current.style.opacity = 0.1;
      prevRef.current.disabled = true;
    }
    if (certificate === myCer.length - 1) {
      nextRef.current.style.opacity = 0.1;
      nextRef.current.disabled = true;
    }
  }, [certificate]);
  const handleSwitchingNext = () => {
    setCertificate((prev) => prev + 1);
  };
  const handleSwitchingPrev = () => {
    setCertificate((prev) => prev - 1);
  };

  return (
    <div className="h-fit w-app bg-vintagePaper-0 flex flex-col">
      <div className="w-full h-9 text-center text-xl m-4">
        FRONTEND WEB DEVELOPER
      </div>
      <div className="w-full h-fit flex p-4 gap-5 ">
        <ul className="w-2/3 text-sm leading-6">
          <li>Name:</li>
          <li className="text-right w-full">Nguyen Nhat Anh Hy</li>
          <li>Date Birth:</li>
          <li className="text-right w-full">14/08/1999</li>
          <li>Email:</li>
          <li className="text-right w-full">hynguyen1408@gmail.com</li>
          <li>Phone:</li>
          <li className="text-right w-full">+84765146438</li>
          <li>Graduated:</li>
          <li className="text-right w-full">
            Ho Chi Minh University of Technology
          </li>
        </ul>
        <img
          src={avatar}
          alt=""
          className=" w-1/3 h-fit object-contain border-8 border-white "
        />
      </div>
      <div className="w-full px-14 py-8 flex justify-evenly">
        <button
          ref={prevRef}
          onClick={handleSwitchingPrev}
          
          className=" text-5xl"
        >
          &lt;
        </button>
        <div className="border-black border-dotted border-4 w-utility">
          <img src={myCer[certificate]} />
        </div>
        <button
          ref={nextRef}
          onClick={handleSwitchingNext}
          
          className=" text-5xl"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default PersonalInfo;
