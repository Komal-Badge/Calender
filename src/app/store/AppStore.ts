import { createStore } from 'redux';
import allReducers from "../reducer/reducer";
const appStore = createStore(
    allReducers,
);
export { appStore };