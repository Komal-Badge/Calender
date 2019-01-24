import * as React from 'react';
import { connect } from 'react-redux';
import { addEvent, updateEvent } from "../action/action"
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';

interface IProps {
    date: any,
    eventList: any,
    addEvent?(formaData: any): any,
    updateEvent?(formaData: any, id: string): any
    history: any
}
class AddEvent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        this.state = { "formData": props.location.param.formData, "heading": props.location.heading, "id": props.location.id }
    }
    componentDidMount = () => {
        let eventList = this.props.eventList || [];
        let currentDate = this.props.date;
        let getItem = (eventList || []).filter((items: any) => currentDate == items.date);
        if (getItem.length == 0) {
            eventList.push({ "date": currentDate, "events": [] });
        }
        if (this.state.heading == "Update") {
            let startTimeTemp = this.state.formData.startTime.split(" ");
            let startTime = startTimeTemp[0].split(":");
            let endTimeTemp = this.state.formData.endTime.split(" ");
            let endTime = endTimeTemp[0].split(":");
            let formData = { "title": "", "startTimeMin": "", "startTimeHr": "", "endTimeHr": "", "endTimeMin": "", "startTime": "AM", "endTime": "AM", "allDay": "" }
            formData.startTime = startTimeTemp[1];
            formData.startTimeHr = startTime[0];
            formData.startTimeMin = startTime[1];
            formData.endTime = endTimeTemp[1];
            formData.endTimeHr = endTime[0];
            formData.endTimeMin = endTime[1];
            formData.title = this.state.formData.title;
            this.setState({ "formData": formData });
        }
    }
    addEvent = () => {
        if (this.state.heading == "Update") {
            this.props.updateEvent(this.state.formData, this.state.id);
        } else {
            this.props.addEvent(this.state.formData);
        }
        this.props.history.push('/');
    }

    setFormValue = (flag: string, event: any) => {
        this.state.formData[flag] = event.target.value;
        this.setState({
            "formData": this.state.formData
        });
    }
    render() {
        let timeInhrOptions, timeInMinOptions, timingOption;
        let timeInhr = ["Select Time", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let timeInMin = ["Select Time", "00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
        let timeOption = ["AM", "PM"]
        timeInhrOptions = timeInhr.map((item, index) =>
            <option key={index} value={item}>{item}</option>
        );
        timeInMinOptions = timeInMin.map((item, index) =>
            <option key={index} value={item}>{item}</option>
        );
        timingOption = timeOption.map((item, index) =>
            <option key={index} value={item}>{item}</option>
        );
        return (
            <div >
                <div className="eventHeader">
                    <Link to={{ pathname: '/' }} >  <i className="fa fa-angle-left iconSize iconAlignMent" ></i></Link>
                    <h3>{this.state.heading} Event</h3>
                </div>
                <form className="formOuter" method="POST"  >
                    <div className="row">
                        <div className="col-25">
                            <label >Title</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="title" name="title" autoComplete="off" value={this.state.formData.title} onChange={(e) => this.setFormValue("title", e)} placeholder="Title.." />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label >Start Time</label>
                        </div>
                        <div className="col-75">
                            <select className="selectWidth" id="startTimeHr" value={this.state.formData.startTimeHr} onChange={(e) => this.setFormValue("startTimeHr", e)} name="startTimeHr"  >
                                {timeInhrOptions}
                            </select>
                            <select className="selectWidth" id="startTimeMin" value={this.state.formData.startTimeMin} onChange={(e) => this.setFormValue("startTimeMin", e)} name="startTimeMin" >
                                {timeInMinOptions}
                            </select>
                            <select className="selectTimeWidth" value={this.state.formData.startTime} onChange={(e) => this.setFormValue("startTime", e)} name="startTime">
                                {timingOption}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label >End Time</label>
                        </div>
                        <div className="col-75">
                            <select className="selectWidth" id="endTimeHr" value={this.state.formData.endTimeHr} onChange={(e) => this.setFormValue("endTimeHr", e)} name="endTimeHr"  >
                                {timeInhrOptions}
                            </select>
                            <select className="selectWidth" id="endTimeMin" value={this.state.formData.endTimeMin} onChange={(e) => this.setFormValue("endTimeMin", e)} name="endTimeMin">
                                {timeInMinOptions}
                            </select>
                            <select className="selectTimeWidth" value={this.state.formData.endTime} onChange={(e) => this.setFormValue("endTime", e)} name="endTime">
                                {timingOption}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">

                        </div>
                        <div className="col-75">
                            <button className="addButton" type="button" onClick={() => this.addEvent()} >{this.state.heading}</button>
                        </div>
                    </div>

                </form>
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
    return bindActionCreators({ addEvent: addEvent, updateEvent: updateEvent }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AddEvent)
