import {
  CLOSE_APP,
  SET_CURRENT_APP,
  SET_RUNNING_APPS_LIST,
  CLEAN_TEMP,
  DRAGGING,
  SET_DRAGGING_POSITION,
  SET_DRAGGING_INITIAL_POSITION,
} from "./constant";

export const setRunningAppsList = (payload) => ({
  type: SET_RUNNING_APPS_LIST,
  payload,
});
export const setCurrentApp = (payload) => ({
  type: SET_CURRENT_APP,
  payload,
});
export const closeApp = (payload) => ({
  type: CLOSE_APP,
  payload,
});
export const cleanTemp = () => ({
  type: CLEAN_TEMP,
});
export const dragging = (payload) => ({
  type: DRAGGING,
  payload,
});
export const setPosition = (payload) => ({
  type: SET_DRAGGING_POSITION,
  payload,
});
export const setInitialPosition = (payload) => ({
  type: SET_DRAGGING_INITIAL_POSITION,
  payload,
});
