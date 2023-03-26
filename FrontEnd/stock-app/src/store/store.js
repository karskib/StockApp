import { configureStore } from "@reduxjs/toolkit";
import rowReducer from "./rowStore";

export default configureStore({
  reducer: rowReducer,
});
