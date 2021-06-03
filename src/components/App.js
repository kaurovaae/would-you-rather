import React, {Component, Fragment}     from 'react';
import {handleInitialData}              from "../actions/shared";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {connect}                        from 'react-redux';
import LoadingBar                       from "react-redux-loading";
import Nav                              from "./Nav";
import Dashboard                        from '../components/Dashboard';

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
                    <LoadingBar style={{backgroundColor: 'blue'}} />
                    <div>
                        <Nav />
                        <div>
                            <Route path="/" exact component={Dashboard} />
                        </div>
                    </div>
                </Fragment>
            </Router>
        );
    }
}

const mapStateToProps = ({questions}) => ({
    loading: !questions.length
});

export default connect(mapStateToProps)(App);
