import * as actionTypes from "./types";

export const setUser = (User) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const clearUser = (User) => {
  return {
    type: actionTypes.CLEAR_USER,
    payload: {
      currentUser: null,
    },
  };
};
