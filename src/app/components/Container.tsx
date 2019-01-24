import * as React from "react";
import Header from "./Header";
import EventsCalender from "./EventsCalender";
const Container = () => (
    <div className="row container">
        <Header></Header>
        <EventsCalender></EventsCalender>
    </div>
)

export default Container;