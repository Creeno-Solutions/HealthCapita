// import { configureStore, createSlice } from "@reduxjs/toolkit";

import { combineReducers } from "@reduxjs/toolkit";
import HRAReducer from "../../Pages/HRA/reducers/HRAReducer";


const rootReducer = combineReducers({
  HRA: HRAReducer
});
export default rootReducer;
