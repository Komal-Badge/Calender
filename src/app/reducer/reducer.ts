import eventsReducer from "./eventsReducer"
import { combineReducers } from "redux";
const allReducers = combineReducers({
    eventList: eventsReducer,
});

export default allReducers;