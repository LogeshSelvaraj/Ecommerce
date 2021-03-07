import {combineReducers} from "redux"
import userReducer from "./userReducer"
import Sidebar from './Sidebar'
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const persistedState = loadState();

const allReducers = combineReducers({
  user: userReducer,
  sidebarLink: Sidebar,
});

export const store = createStore(
  allReducers,
  persistedState,
  composeWithDevTools()
);


store.subscribe(() => {
  saveState(store.getState());
});




export default allReducers;