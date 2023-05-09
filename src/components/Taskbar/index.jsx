import Dropdown from "./components/Dropdown";
import { HomeContext, actions } from "~/homepage-store";

import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useMemo, useRef } from "react";
import { AppContext, actions as appActions } from "@comp/Application/app-store";

import PersonalInfo from "@comp/Application/PersonalInfo";
import NewText from "@comp/Application/NewText";
import ClockMini from "@app/Clock/components/Clockminimize";
import { handleExtension } from "@comp/Icon/utils";
function Taskbar() {
  const findInputRef = useRef();
  const navigate = useNavigate();
  const [state, dispatch] = useContext(HomeContext);
  const [stateApp, dispatchApp] = useContext(AppContext);
  const createTab = ([...tab], [...handleFunc]) => {
    let newTab = [...tab].map((x, index) => ({
      name: x,
      handleClick: [...handleFunc][index],
    }));
    return newTab;
  };
  const handleRefresh = useCallback(()=>{
    dispatch(actions.refresh());
  },[])
  const handleChangeBG = useCallback(() => {
    dispatch(actions.changeBackground());
  }, []);
  const handleShowInfo = useCallback(() => {
    dispatchApp(appActions.setRunningAppsList(<PersonalInfo />));
  }, []);
  const handleReset = useCallback(() => {
    navigate("/");
    localStorage.removeItem("user");
    window.location.reload();
  }, []);
  const handleLockScreen = useCallback(() => {
    dispatch(actions.lockScreen(true));
  }, []);
  const handleNewText = useCallback(() => {
    dispatchApp(appActions.setRunningAppsList(<NewText />));
  }, []);
  const handleFindTaskBar = useCallback(() => {
    findInputRef.current.style.visibility = "visible";
    findInputRef.current.children[0].focus();
  }, []);
  const handleFind = (e) => {
    dispatch(actions.findApp(e.target.value));
  };
  const handleSortByKind = useCallback(() => {
    console.log(state.appList);
    let newOrder = state.appList.map(app=>({...app,extention:handleExtension(app)}))
    newOrder.sort((a, b) =>
      a.extention.localeCompare(b.extention)
    );

    dispatch(actions.sortByKind(newOrder));
  }, [state.appList]);
  const handleSortByName = useCallback(() => {
    let newOrder = state.appList;
    newOrder.sort((a, b) => a.type.displayName.localeCompare(b.type.displayName));
    dispatch(actions.sortByName(newOrder));
  }, [state.appList]);
  const infoTab = useMemo(
    () =>
      createTab(
        ["Personal Info", "Change Background", "Lock Screen",'Refresh', "Reset"],
        [handleShowInfo, handleChangeBG, handleLockScreen,handleRefresh, handleReset]
      ),
    []
  );
  const fileTab = useMemo(
    () => createTab(["New Text", "Find"], [handleNewText, handleFindTaskBar]),
    []
  );
  const viewTab = useMemo(
    () =>
      createTab(
        ["Sort By Name", "Sort By Kind"],
        [handleSortByName, handleSortByKind]
      ),
    [state.appList]
  );

  return (
    <div
      className="w-full h-8 bg-old-0 border-b-black border-b-2 relative top-0 left-0 flex justify-between items-center \"
      style={{ zIndex: 3 }}
    >
      <div className="logo flex justify-evenly items-center h-full w-96">
        <Dropdown dropdownItems={infoTab}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 fill-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
            />
          </svg>
        </Dropdown>
        <Dropdown dropdownItems={fileTab}>File</Dropdown>
        <Dropdown dropdownItems={viewTab}>View</Dropdown>
      </div>
      <div
        className="h-3/4 w-1/4 invisible z-10 flex relative items-center"
        ref={findInputRef}
      >
        <input
          onChange={handleFind}
          value={state.find}
          className="h-full w-full border-black border-2 p-2 text-xs "
        />
        <button
          onClick={() => (findInputRef.current.style.visibility = "hidden")}
          className="absolute right-1 text-xs"
        >
          X
        </button>
        <div className="flex flex-col w-full absolute top-6 left-0 ">
          {state.findList.map((app, index) => (
            <button
              key={index}
              onClick={() => {
                dispatchApp(appActions.setRunningAppsList(<app.type />));
                dispatch(actions.findApp(""));
                findInputRef.current.style.visibility = "hidden";
              }}
              className="bg-white p-3 text-left rounded-none border "
            >
              {app.type.displayName}
            </button>
          ))}
        </div>
      </div>
      <ClockMini />
    </div>
  );
}

export default Taskbar;
