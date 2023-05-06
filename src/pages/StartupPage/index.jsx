import logovuong from '@asset/logovuong.jpg';
import dotBG from '@asset/dot_background.jpeg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StartupPage() {
    const [loadingBar, setBar] = useState([]);
    useEffect(() => {
        const loading = setTimeout(() => {
            if (loadingBar.length > 4) {
                setBar([1]);
            } else {
                setBar((prev) => [...prev, 1]);
            }
        }, 1000);
        return () => {
            clearTimeout(loading);
        };
    }, [loadingBar]);
         //redirect
     const navigate = useNavigate()
     useEffect(()=>{
         const loadingDone = setTimeout(()=>{
           navigate('/Login',{replace: true})
         },8000)
         return () =>{
           clearTimeout(loadingDone)
         }
       },[])

    return (
        <div
            className="flex flex-col justify-around items-center w-screen h-screen font-bold border-black border-4 bg-old-0"
            style={{ backgroundImage: `url(${dotBG})` }}
        >
            <img src={logovuong} className="h-96 w-96 rounded-xl bor "></img>
            <div className="text-3xl">MY LIFE OS</div>
            <div>Beta Realease</div>
            <div className="h-5 flex ">
                <span className="animate-spin mr-3">/</span>
                <div className=' flex'>{loadingBar.map((x,index) => (x === 1 ? <div key={index} className="w-5 bg-black ml-1"></div> : ''))}</div>
                <span className="animate-spin ml-3">/</span>
            </div>
            <div>Copyright &#169; 99's Corporation, 1999. All rights reserved.</div>
            <div className="mb-20 animate-bounce">My life is starting...</div>
        </div>
    );
}
export default StartupPage;
