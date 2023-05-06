import { useEffect, useState } from "react";
import Application from "../../components/Application";
import Disk from "@asset/floppyDisk.png";
function LoginPage() {
  const [users, setUser] = useState([]);
  const [checkedUser, setCheckedUser] = useState("");
  const [password,setPass] = useState('');
  const [showPass,setShowPass] = useState(false)
  useEffect(() => {
    fetch("https://fakestoreapi.com/users?limit=4")
      .then((res) => res.json())
      .then((usersFet) => setUser(usersFet));
  }, []);
 const handlePassword = (e) => {
  setPass(e.target.value)
 }
 const handleHint = ()=>{
   setShowPass(true)
   setPass(users.find(user=>user.username===checkedUser).password)
 }
 const handleLogin = () => {
  
 }
  return (
    <div className="w-screen h-screen bg-cyan-600 flex justify-center items-center">
      <Application index="Login Page">
        {
          <div className=" w-app h-fit bg-old-0 flex flex-col justify-evenly p-8 text-sm gap-7">
            <div className="w-full h-20 text-4xl flex gap-5">
              <img src={Disk} alt="" className="h-full" />
              <span>
                My Life <br /> Operating System
              </span>
            </div>
            <div className=" text-sm">Select user name:</div>
            <ul className="bg-white shadow-inner shadow-black w-full h-fit p-2">
              {users.map((user) => (
                <li>
                  {" "}
                  <button
                    onClick={() => setCheckedUser(user.username)}
                    className={`w-full text-left ${user.username===checkedUser&&'bg-blue-700 text-white'}`}
                  >
                    {user.username}
                  </button>
                </li>
              ))}
            </ul>
            <div className="text-sm">Password:</div>
            <input
              type={showPass ? 'text' : 'password'}
              className="w-full p-2 rounded-none shadow-inner shadow-black"
              value={password}
              onChange={handlePassword}
            />
            <div>
              <input type="checkbox" name="" id="show-pass" checked={showPass} onChange={()=>setShowPass(prev=>!prev)} />
              <label htmlFor="show-pass" className="ml-3 text-xs underline-offset-1 underline hover:text-blue-700">Show password</label>
            </div>
            <div className="self-end">
              <button className="border border-gray-600 shadow shadow-black rounded-none p-2">
                Login
              </button>
              <button className="border border-gray-400 shadow shadow-black rounded-none p-2 ml-4"
              onClick={handleHint}>
                Get Hint
              </button>
            </div>
          </div>
        }
      </Application>
    </div>
  );
}

export default LoginPage;
