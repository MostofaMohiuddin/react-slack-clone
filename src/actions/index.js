import * as actionTypes from "./types";

export const setUser = (User) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};
