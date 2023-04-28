import {
  CHANGE_BACKGROUND,
  SORT_BY_NAME,
  SORT_BY_KIND,
  SET_NEW_FILE,
  LOCK_SCREEN,
  FIND_APP,

} from "./constant";

export const changeBackground = () => ({
  type: CHANGE_BACKGROUND,
});
export const sortByName = (payload) => ({
  type: SORT_BY_NAME,
  payload,
});
export const sortByKind = (payload) => ({
  type: SORT_BY_KIND,
  payload,
});
export const lockScreen = (payload) => ({
  type: LOCK_SCREEN,
  payload,
});
export const findApp = (payload) => ({
  type: FIND_APP,
  payload,
});
export const setNewFile = (payload) => ({
  type: SET_NEW_FILE,
  payload,
});

