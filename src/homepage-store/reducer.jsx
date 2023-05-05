import MyShop from "../components/Application/MyShop";
import Piano from "../components/Application/Piano";
import {
  CHANGE_BACKGROUND,
  FIND_APP,
  LOCK_SCREEN,
  SET_NEW_FILE
} from "./constant";

const initState = {
  bgColor: "rgba(0, 0, 255, 0.25)",
  sortBy: "NAME-SORT",
  lockScreen: false,
  find: "",
  findList: [],
  appList: [<MyShop/>,<Piano/>],
  
 
};
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_BACKGROUND: {
      let color = [
        "rgba(255, 0, 0, 0.25)",
        "rgba(0, 0, 255, 0.25)",
        "rgba(0, 255, 0, 0.25)",
      ];
      return {
        ...state,
        bgColor: color[Math.floor(Math.random() * color.length)],
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
          app.type.name.include(action.payload)
        ),
      }; // chua hoan thanh
    }
    case SET_NEW_FILE: {
      return {...state,appList:[...state.appList,action.payload]}
    }
    

    default:
      throw Error("Invalid action at HomePage");
  }
};
export { initState };
export default reducer;
