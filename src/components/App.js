import React, {Component, Fragment}     from 'react';
import {handleInitialData}              from "../actions/shared";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
}                                       from "react-router-dom";
import UserRoute                        from "./UserRoute";
import {connect}                        from 'react-redux';
import LoadingBar                       from "react-redux-loading";
import Navigation                       from "./Navigation";
import Dashboard                        from '../components/Dashboard';
import NewQuestion                      from '../components/NewQuestion';
import QuestionPage                     from '../components/QuestionPage';
import NotFound                         from '../components/NotFound';
import LeaderBoard                      from '../components/LeaderBoard';
import Login                            from '../components/Login';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar style={{backgroundColor: '#00b6e8'}} />
                    <Navigation />
                    <hr />
                    <div className="container">
                        <Switch>
                            <UserRoute path="/" exact component={Dashboard} />
                            <UserRoute path="/questions/:id" component={QuestionPage} />
                            <UserRoute path="/add" component={NewQuestion} />
                            <UserRoute path="/leaderboard" component={LeaderBoard} />
                            <UserRoute path="/404" component={NotFound} />
                            <Route path="/login" component={Login} />
                            <Redirect to="/404" />
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        );
    }
}

export default connect()(App);
