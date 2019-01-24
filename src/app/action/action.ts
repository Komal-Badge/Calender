
export const updateSelectedDate = (date: any) => {
    return {
        type: "UPDATE_DATE",
        payload: date
    }
}

export const updateEventList = (eventList: any) => {
    return {
        type: "UPDATE_EVENTLIST",
        payload: eventList
    }
}

export const addEvent = (formData: any) => {
    return {
        type: "ADD_EVENT",
        payload: formData
    }
}

export const deleteEvent = (id: any) => {
    return {
        type: "DELETE_EVENT",
        payload: id
    }
}

export const updateEvent = (formData: any, id: string) => {
    return {
        type: "UPDATE_EVENT",
        payload: formData,
        id: id
    }
}
