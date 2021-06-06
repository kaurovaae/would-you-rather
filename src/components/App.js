import React, {Component, Fragment}     from 'react';
import {handleInitialData}              from "../actions/shared";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {connect}                        from 'react-redux';
import LoadingBar                       from "react-redux-loading";
import Nav                              from "./Nav";
import Dashboard                        from '../components/Dashboard';
import NewQuestion                      from '../components/NewQuestion';
import QuestionPage                     from '../components/QuestionPage';
import AnswerPage                       from '../components/AnswerPage';

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
                    <Nav />
                    <hr />
                    <div className="container">
                        {!loading && (
                            <Fragment>
                                <Route path="/" exact component={Dashboard} />
                                <Route path="/question/:id" component={QuestionPage} />
                                <Route path="/answer/:id" component={AnswerPage} />
                                <Route path="/new" component={NewQuestion} />
                            </Fragment>
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
