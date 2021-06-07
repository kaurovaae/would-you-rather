import React, {Component, Fragment}     from 'react';
import {handleInitialData}              from "../actions/shared";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
}                                       from "react-router-dom";
import {connect}                        from 'react-redux';
import LoadingBar                       from "react-redux-loading";
import Navigation                       from "./Navigation";
import Dashboard                        from '../components/Dashboard';
import NewQuestion                      from '../components/NewQuestion';
import QuestionPage                     from '../components/QuestionPage';
import NotFound                         from '../components/NotFound';
import LeaderBoard                      from '../components/LeaderBoard';

// import logo from '../logo.svg';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const {loading} = this.props;

        return (
            <Router>
                <Fragment>
                    <LoadingBar style={{backgroundColor: '#00b6e8'}} />
                    <Navigation />
                    <hr />
                    <div className="container">
                        {!loading && (
                            <Switch>
                                <Route path="/" exact component={Dashboard} />
                                <Route path="/questions/:id" component={QuestionPage} />
                                <Route path="/add" component={NewQuestion} />
                                <Route path="/leaderboard" component={LeaderBoard} />
                                <Route path="/404" component={NotFound} />
                                <Redirect to="/404" />
                            </Switch>
                        )}
                    </div>
                </Fragment>
            </Router>
        );
    }
}

const mapStateToProps = ({authedUser}) => ({
    loading: !authedUser
});

export default connect(mapStateToProps)(App);
