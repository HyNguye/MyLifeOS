import {
  CLOSE_APP,
  SET_CURRENT_APP,
  SET_RUNNING_APPS_LIST,
  CLEAN_TEMP,
  DRAGGING,
  SET_DRAGGING_POSITION,
  SET_DRAGGING_INITIAL_POSITION,
} from "./constant";
import PersonalInfo from "../PersonalInfo";

const initState = {
  nameApp: 'PersonalInfo0',
  appRunning: [<PersonalInfo/>],
   //Drag feature
   isDraggable: false,
   dragPosition: { x: 0, y: 0 },
   dragInitialPosition: { x: 0, y: 0 },
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_RUNNING_APPS_LIST: {
      let newAppRunning = state.appRunning;
      return { ...state, appRunning: [...newAppRunning, action.payload] };
    }
    case SET_CURRENT_APP: {
      return { ...state, nameApp: action.payload };
    }

    case CLOSE_APP: {
      let afterRemoveApps = state.appRunning.map((app) => {
        if (app === action.payload) {
          return "";
        }
        return app;
      });

      return { ...state, appRunning: afterRemoveApps };
    }
    case CLEAN_TEMP: {
      return { ...state, appRunning: [] };
    }
    //DRAGGING FEATURE
    case DRAGGING: {
      return { ...state, isDraggable: action.payload };
    }
    case SET_DRAGGING_POSITION: {
      return { ...state, dragPosition: action.payload };
    }
    case SET_DRAGGING_INITIAL_POSITION: {
      return { ...state, dragInitialPosition: action.payload };
    }

    default:
      throw Error(`Invalid action at Application ${state.nameApp}`);
  }
};
export { initState };
export default reducer;
