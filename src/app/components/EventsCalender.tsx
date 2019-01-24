import * as React from 'react';
import timeJson = require('../time.json');
import * as moment from 'moment';
import { connect } from 'react-redux';
import { deleteEvent } from "../action/action"
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import "../../app/index.css";
interface IProps {
    date?: any,
    eventList?: any,
    deleteEvent?(event: any): any,
}
class EventsCalender extends React.Component<IProps> {
    renderTime = () => {
        return (timeJson || []).map((item: any, index: number) => {
            return (
                <tr key={index}>
                    <td className="width20">{item}</td>
                    <td className="width60"></td>
                </tr>
            );
        });
    }
    deleteEvent = (id: any) => {
        let val = confirm("Are you sure you want to delete this event?");
        if (val == true) {
            this.props.deleteEvent({ id: id })
        }
    }
    renderEvents = () => {
        let currentDate = this.props.date;
        let eventListItems;
        let eventsList = (this.props.eventList || []).filter((items: any) =>
            currentDate.toString() == items.date.toString()
        );
        if (eventsList.length > 0) { eventListItems = eventsList[0].events }
        return (eventListItems || []).map((item: any, index: number) => {
            let startTime = moment(item.startTime, "HH:mm A");
            let endTime = moment(item.endTime, "HH:mm A");
            let diffInHrs = endTime.diff(startTime, 'hours');
            let diffInMins = moment.utc(moment(endTime, "HH:mm A").diff(moment(startTime, "HH:mm"))).format("mm");
            let startTimeHr = startTime.hour();
            let startTimeMin = startTime.minute();
            if (startTimeMin == 0) { startTimeMin = 17 }
            let topStyle = ((startTimeHr - 1) * 40) + startTimeHr + (startTimeMin);
            let tempDiff = diffInHrs - 1;
            let timeInMins = (tempDiff * 40) + (40) + tempDiff + parseInt(diffInMins);
            if (timeInMins < 25) { timeInMins = 25 }
            let divStyle = {
                top: topStyle,
                border: "3px solid rgb(195, 228, 246)",
                backgroundColor: "#efebff",
                marginLeft: "10%",
                width: "88%",
                height: timeInMins,
            };
            return (
                <div key={index} style={divStyle} className="position">
                    <table className="table fontSizeTable">
                        <tbody>
                            <tr>
                                <td className="width20">
                                    {item.startTime} -- {item.endTime}
                                </td>
                                <td>
                                    {item.title}
                                </td>
                                <td className="width10" >
                                    <Link to={{ pathname: '/addEvent', param: { "formData": item }, heading: "Update", "id": item.id }}   > <i className="fa fa-pencil fontSize" aria-hidden="true"></i></Link>
                                </td>
                                <td className="width10" onClick={() => this.deleteEvent(item.id)}>
                                    <i className="fa fa-close fontSize" aria-hidden="true"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        });
    }
    render() {
        return (
            <div className="header tableOuter ">
                <table className="table borderTd">
                    <tbody>
                        {this.renderTime()}
                    </tbody>
                </table>
                {this.renderEvents()}
            </div>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        date: state.eventList.date,
        eventList: state.eventList.eventList
    }
}

const matchDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ deleteEvent: deleteEvent }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EventsCalender)

