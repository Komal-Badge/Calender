import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateSelectedDate } from "../action/action"
import { Link } from 'react-router-dom';
import "../../app/index.css";
import * as moment from 'moment';

interface IProps {
    date?: any,
    updateSelectedDate?(event: any): any,
}

class HeaderComp extends React.Component<IProps,any>{
    constructor(props: IProps) {
        super(props);
        this.state = { "addButtonLogic": "hrefDecoration" }
    }
    showUpdatedDate = (flag: string) => {
        let newDate = "";
        if (flag == "prev") {
            newDate = moment(this.props.date).subtract(1, 'days').format('DD MMM, YYYY');
        } else if (flag == "next") {
            newDate = moment(this.props.date).add(1, 'days').format('DD MMM, YYYY');
        } else {
            newDate = moment(new Date()).format('DD MMM, YYYY');
        }
        this.props.updateSelectedDate({
            date: newDate
        });
        this.setAddButton(newDate);
    }
    setAddButton = (newDate: any) => {
        if ((moment(newDate).format("DD/MM/YYYY")) >= (moment(new Date()).format("DD/MM/YYYY"))) {
            this.setState({ "addButtonLogic": "hrefDecoration" });
        } else {
            this.setState({ "addButtonLogic": "hideButton" })
        }
    }
    render() {
        let currenDate = this.props.date;
        let formData = { "title": "", "startTimeMin": "", "startTimeHr": "", "endTimeHr": "", "endTimeMin": "", "startTime": "AM", "endTime": "AM", "allDay": "" };
        return (
            <div className="header">
                <table className="table headerSeparater">
                    <tbody>
                        <tr>
                            <td className="width12">
                                <button className="button" onClick={() => this.showUpdatedDate("prev")}> <i className="fa fa-angle-left iconSize" ></i></button>
                                <button className="button" onClick={() => this.showUpdatedDate("next")}><i className="fa fa-angle-right iconSize" ></i></button>
                            </td>
                            <td className="width40">
                                <button className="button buttonOuter" onClick={() => this.showUpdatedDate("todaysDate")}>Today</button>
                            </td>
                            <td className="width45 headingFont">{currenDate}</td>
                            <td className="width5">
                                <Link to={{ pathname: '/addEvent', param: { formData }, "heading": "Add" }} className={this.state.addButtonLogic} > <button className="button buttonOuter" >Add</button></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const matchStateToProps = (state: any) => {
    return {
        date: state.eventList.date
    }
}

const matchDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ updateSelectedDate: updateSelectedDate }, dispatch)
}

export default connect(matchStateToProps, matchDispatchToProps)(HeaderComp)