import {
  CHANGE_BACKGROUND,
  FIND_APP,
  LOCK_SCREEN,
  SET_NEW_FILE,
  SORT_BY_KIND,
  SORT_BY_NAME,
  REMOVE_DESTOP_ICON,
  REFRESH,
} from "./constant";
import MyShop from "@app/MyShop";
import Piano from "@app/Piano";
import NewText from "@app/NewText";
import Calculator from "@app/Calculator";

const initState = {
  bgColor: "rgba(0, 0, 255, 0.25)",
  lockScreen: false,
  find: "",
  findList: [],
  appList: [
    <MyShop />,
    <Piano />,
    <NewText
      initInput="
    You're welcome! If you have any more questions or need further assistance, feel free to ask.
    Github source: https://github.com/HyNguye/MyLifeOS 
    Note: This website is not intended for mobile devices and Unikey. 
    "
    />,
    <Calculator />,
  ],
};
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_BACKGROUND: {
      let color = [
        "rgba(255, 0, 0, 0.25)",
        "rgba(0, 0, 255, 0.25)",
        "rgba(0, 255, 0, 0.25)",
      ];
      let randomBg = color[Math.floor(Math.random() * color.length)];
      while (randomBg === state.bgColor) {
        randomBg = color[Math.floor(Math.random() * color.length)];
      }
      return {
        ...state,
        bgColor: randomBg,
      };
    }
    case LOCK_SCREEN: {
      return { ...state, lockScreen: action.payload };
    }

    case FIND_APP: {
      return {
        ...state,
        find: action.payload,
        findList: state.appList.filter((app) =>
          app.type.displayName
            .toLowerCase()
            .includes(
              action.payload === "" ? "9999999" : action.payload.toLowerCase()
            )
        ),
      };
    }
    case SET_NEW_FILE: {
      let newArr = state.appList
      return { ...state, appList: [...newArr, action.payload] };
    }
    case SORT_BY_NAME: {

      return { ...state, appList: action.payload };
    }
    case SORT_BY_KIND: {
    
      return { ...state, appList: action.payload };
    }
    case REMOVE_DESTOP_ICON: {
      let newAppList = state.appList.map((app) => {
        if (app !== action.payload) {
          return app;
        }
        return "";
      });
      return { ...state, appList: newAppList };
    }
    case REFRESH: {
      let newAppList = state.appList.filter((app) => app !== "");
      return { ...state, appList: newAppList };
    }
    default:
      throw Error("Invalid action at HomePage");
  }
};
export { initState };
export default reducer;
