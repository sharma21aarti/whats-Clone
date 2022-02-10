import React, { createContext, useReducer, useContext } from "react";

export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};
console.log("set_user");

const reducer = (state, action) => {
  console.log("action", action);
  console.log("state", state);

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        user: action.user,
        state,
      };

    default:
      return state;
  }
  console.log("user", state);
};

export default reducer;

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  const state = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
