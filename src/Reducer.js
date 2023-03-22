import { doc, getDoc } from "firebase/firestore";
import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import db from "./firebase";

export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        user: action.user,
        state,
      };

    default:
      return state;
  }
};

export default reducer;

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  const navigate = useNavigate();
  // const state = useReducer(reducer, initialState);
  const [user, setUser] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem("user"));
    if (!userInfo) {
      navigate("/login");
    } else {
      setUser(userInfo);
    }
  }, [navigate]);
  return (
    <StateContext.Provider value={{ user, setUser }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
