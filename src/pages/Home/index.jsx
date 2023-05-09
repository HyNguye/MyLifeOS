import dotBG from "@asset/dot_background.jpeg";
import Taskbar from "@comp/Taskbar";
import {
  AppContext,
  actions as appActions,
} from "../../components/Application/app-store";
import { HomeContext, actions } from "~/homepage-store";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Application from "@comp/AppLayout";
import Draggable from "../../components/Dragable";
import AppIcon from "../../components/Icon";
function Home() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(HomeContext);
  const [stateApp, dispatchApp] = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef();
  //check login token (use unique username like token)
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/Login", { replace: true });
    }
  }, []);
  //remove appRuning queue
  useEffect(() => {
    if (
      stateApp.appRunning.every((app) => app === "") &&
      stateApp.appRunning.length !== 0
    ) {
      dispatchApp(appActions.cleanTemp());
    }
  }, [stateApp.appRunning]);
  //Savescreen feature
  useEffect(() => {
    if (state.lockScreen) {
      navigate("/Lockscreen", { replace: true });
    }
  });
  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(actions.lockScreen(true));
    }, 120000);
    const handleAutoLockScreen = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(actions.lockScreen(true));
      }, 120000);
    };
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener("mousemove", handleAutoLockScreen);
    window.addEventListener("keydown", handleAutoLockScreen);
    window.addEventListener("click", handleAutoLockScreen);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener("mousemove", handleAutoLockScreen);
      window.removeEventListener("keydown", handleAutoLockScreen);
      window.removeEventListener("click", handleAutoLockScreen);
    };
  }, []);

  //Draggable global on HomePage fix cursor not enough speed bug
  function handleMouseMove(event) {
    if (stateApp.isDraggable) {
      dispatchApp(
        appActions.setPosition({
          x: event.screenX - stateApp.dragInitialPosition.x,
          y: event.screenY - stateApp.dragInitialPosition.y,
        })
      );
    }
  }

  // Unique name for unique ref  => handle many apprunning in one type
  function autoRename(app) {
    let newArr = stateApp.appRunning.filter((myApp) => {
      return myApp.type?.displayName === app.type.displayName || myApp === "";
    });

    if (newArr.lastIndexOf(app) === 0 || newArr.lastIndexOf(app) === -1) {
      return "";
    }
    return newArr.lastIndexOf(app);
  }
  // handleRightClick on gap
  const handleRightClick = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setShowMenu(true);
    }
  };
  const handleRefresh = ()=>{
    dispatch(actions.refresh());
    setShowMenu(false)
  }

  return (
    <div
      className={`flex flex-col items-center w-screen h-screen font-bold bg-blend-multiply overflow-hidden relative`}
      style={{
        backgroundImage: `url(${dotBG})`,
        backgroundColor: `${state.bgColor}`,
      }}
      onMouseUp={() => dispatchApp(appActions.dragging(false))}
      onMouseMove={handleMouseMove}
      onContextMenu={handleRightClick}
    >
      <Taskbar />
      {stateApp.appRunning.map((app, index) => {
        if (app !== "") {
          return (
            <Draggable
              key={index}
              zIndex={
                app.type.displayName + autoRename(app) === stateApp.nameApp
                  ? 2
                  : 1
              }
              appName={app.type.displayName + autoRename(app)}
            >
              <Application index={autoRename(app)}>{app}</Application>
            </Draggable>
          );
        }
      })}
      <div className=" self-start max-w-full w-fit max-h-full h-fit flex-wrap flex flex-col justify-start items-start gap-14 p-14">
        {state.appList.map((app, index) => {
          if (app === "") {
            return;
          }
          return <AppIcon key={app.type.displayName + index}>{app}</AppIcon>;
        })}
      </div>
      {showMenu && (
        <ul
          className=" absolute"
          style={{ top: cursorPosition.y, left: cursorPosition.x }}
          ref={menuRef}
        >
          <li className=" bg-old-0 p-2 h-10 w-64 border-2 border-black text-sm hover:bg-black hover:text-white" onClick={handleRefresh}>Refresh</li>
        </ul>
      )}
    </div>
  );
}
export default Home;
