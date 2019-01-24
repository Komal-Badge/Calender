import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { appStore } from "./store/AppStore";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import AddEvent from './components/AddEvent';
import Container from './components/Container';

ReactDOM.render(
    <Provider store={appStore}>
        <Router>
            <div>
                <Route exact path="/" component={Container} />
                <Route path="/addEvent" component={AddEvent} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
)