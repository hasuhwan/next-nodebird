import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "@reduxjs/toolkit";
import type { AnyAction, CombinedState } from "@reduxjs/toolkit";
import userReducer from "./user";
import postReducer from "./post";

const rootReducer = (state: any, action: AnyAction): CombinedState<any> => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return combineReducers({
        user: userReducer,
        post: postReducer,
      })(state, action);
  }
};

export default rootReducer;
