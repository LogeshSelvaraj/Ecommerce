import {combineReducers} from "redux"
import userReducer from "./userReducer"
import Sidebar from './Sidebar'

const allReducers = combineReducers({
  user: userReducer,
  sidebarLink: Sidebar,
});

export default allReducers;