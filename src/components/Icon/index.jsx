import { HomeContext, actions as homeActions } from "~/homepage-store";
import { useCallback, useContext, useRef, useState } from "react";
import {
  AppContext,
  actions as appActions,
} from "../../components/Application/app-store";
import Options from "./Components/Options";
import * as icon from "@asset/icon";
import { handleExtension } from "./utils";
function AppIcon({ children }) {
  const [state, dispatch] = useContext(HomeContext);
  const [stateApp, dispatchApp] = useContext(AppContext);
  const [rename, setRename] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = useCallback(() => {
    dispatch(homeActions.deleteApp(children));
  }, [state.appList]);
  const handleTurnOffOptions = useCallback(() => {
    setShowOptions(false);
  }, []);
  function autoRename(app) {
    let newArr = state.appList.filter(
      (myApp) =>
        myApp.type?.displayName === app.type.displayName || myApp === ""
    );
    if (newArr.lastIndexOf(app) === 0 || newArr.lastIndexOf(app) === -1) {
      return "";
    }
    return newArr.lastIndexOf(app);
  }
  function handleClickIcon(e) {
    e.target.style.backgroundColor = "black";
    e.target.style.color = "white";
  }

  function handleUnClickIcon(e) {
    e.target.style.backgroundColor = "transparent";
    e.target.style.color = "black";
  }
  function handleRightClick(e) {
    e.preventDefault();
    setShowOptions(true);
  }

  const handleSource = (app) => {
    switch (app.type.displayName) {
      case "New Text":
        return icon.TextIcon;
      case "Piano":
        return icon.PianoIcon;
      case "My Shop":
        return icon.ShopIcon;
      case "Calculator":
        return icon.CalculatorIcon;
      default:
        return icon.NewFolderIcon;
    }
  };

  return (
    <button
      className=" h-28 w-28 flex flex-col"
      onContextMenu={handleRightClick}
      onDoubleClick={() => {
        dispatchApp(
          appActions.setRunningAppsList(
            <children.type initInput={children.props.initInput} />
          )
        );
      }}
      onMouseDown={handleClickIcon}
      onMouseUp={handleUnClickIcon}
    >
      <img
        className="w-full h-full object-contain"
        src={handleSource(children)}
      />
      <div className="text-xs pt-5 w-full h-fit overflow-visible break-words relative">
        {children.type.displayName +
          autoRename(children) +
          handleExtension(children)}
        {showOptions && (
          <Options
            handleDelete={handleDelete}
            handleTurnOffOptions={handleTurnOffOptions}
          />
        )}
      </div>
    </button>
  );
}

export default AppIcon;
