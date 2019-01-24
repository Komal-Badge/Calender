import eventsJson = require("../event.json");
import * as moment from 'moment';
let todaysDate = (new Date());
let eventList = eventsJson;
export interface IAppState {
    date: string,
    eventList: any
}
const INITIAL_STATE: IAppState = {
    "date": moment(todaysDate).format("DD MMM, YYYY"), "eventList": eventList
}
const eventsReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'UPDATE_DATE':
            return { ...state, date: action.payload.date }
        case "DELETE_EVENT":
            (state.eventList || []).map((items: any) => {
                if (items.date.toString() == state.date.toString()) {
                    (items.events || []).map((item: any, index: number) => {
                        if (item.id == action.payload.id) {
                            items.events.splice(index, 1)
                        }
                    })
                }
            });
            return { ...state, eventList: [...state.eventList] }
        case "UPDATE_EVENT":
            (state.eventList || []).map((items: any) => {
                if (items.date.toString() == state.date.toString()) {
                    (items.events || []).map((item: any) => {
                        if (item.id == action.id) {
                            item.title = action.payload.title;
                            item.startTime = action.payload.startTimeHr + ":" + action.payload.startTimeMin + " " + action.payload.startTime;;
                            item.endTime = action.payload.endTimeHr + ":" + action.payload.endTimeMin + " " + action.payload.endTime;
                        }
                    })
                }
            });
            return { ...state, eventList: [...state.eventList] }
        case 'ADD_EVENT':
            let temList = state.eventList;
            temList.map((items: any) => {
                if (state.date.toString() == items.date.toString()) {
                    items.events.push({
                        id: items.events.length + 1,
                        title: action.payload.title,
                        startTime: action.payload.startTimeHr + ":" + action.payload.startTimeMin + " " + action.payload.startTime,
                        endTime: action.payload.endTimeHr + ":" + action.payload.endTimeMin + " " + action.payload.endTime,
                    })
                }
            })
            return { ...state, eventList: temList }
        default:
            return INITIAL_STATE
    }
}

export default eventsReducer;