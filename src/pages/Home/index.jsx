import dotBG from "@asset/dot_background.jpeg";
import Taskbar from "@comp/Taskbar";
import {
  AppContext,
  actions as appActions,
} from "../../components/Application/app-store";
import { HomeContext, actions } from "~/homepage-store";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import Application from "../../components/Application";
import Draggable from "../../components/Dragable";
import AppIcon from "../../components/Icon";
function Home() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(HomeContext);
  const [stateApp, dispatchApp] = useContext(AppContext);
  //check login token (use unique username like token)
  useEffect(() => {
    if (!(localStorage.getItem("user"))) {
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
    window.addEventListener("mousemove", handleAutoLockScreen);
    window.addEventListener("keydown", handleAutoLockScreen);
    window.addEventListener("click", handleAutoLockScreen);

    return () => {
      clearTimeout(timer);
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
    let newArr = stateApp.appRunning.filter((myApp) => myApp.type === app.type);

    if (newArr.lastIndexOf(app) === 0 || newArr.lastIndexOf(app) === -1) {
      return "";
    }
    return newArr.lastIndexOf(app);
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
    >
      <Taskbar />
      {stateApp.appRunning.map((app, index) => {
        if (app !== "") {
          return (
            <Draggable
              key={index}
              zIndex={
                app.type.name + autoRename(app) === stateApp.nameApp ? 2 : 1
              }
              appName={app.type.name + autoRename(app)}
            >
              <Application index={autoRename(app)}>{app}</Application>
            </Draggable>
          );
        }
      })}
      <div className=" self-start max-w-full w-fit max-h-full h-fit flex-wrap flex flex-col justify-start items-start gap-14 p-14">
        {state.appList.map((app, index) => (
          <AppIcon key={app.type.name + index}>{app}</AppIcon>
        ))}
      </div>
    </div>
  );
}
export default Home;
