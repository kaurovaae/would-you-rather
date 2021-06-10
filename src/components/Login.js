import React, {Component}                   from 'react';
import {connect}                            from 'react-redux';
import {Redirect}                           from "react-router-dom";
import getQueryParams                       from "../utils/getQueryParams";
import LoginForm                            from "./LoginForm";
import RegisterForm                         from "./RegisterForm";
import {handleClearError}                   from "../actions/error";

import reactLogo                            from '../logo.svg';

const STEP = {
    LOGIN: 'login',
    REGISTRATION: 'registration'
};

class Login extends Component {
    state = {
        step: STEP.LOGIN
    };

    handleRegister = () => {
        this.setState(() => ({
            step: STEP.REGISTRATION
        }));
        this.props.dispatch(handleClearError());
    };

    handleLogin = () => {
        this.setState(() => ({
            step: STEP.LOGIN
        }));
        this.props.dispatch(handleClearError());
    };

    render() {
        const {step} = this.state;
        const {isAuthed, next} = this.props;

        if (isAuthed) {
            return <Redirect to={next} />
        }

        return (
            <div className="block-container">
                <div className="login-header">
                    <h3>Welcome to Would You Rather React App!</h3>
                    <p>Please, sign in to continue</p>
                </div>
                <div className="block-content">
                    <div className="block-left">
                        <img
                            src={reactLogo}
                            alt="avatar"
                            className="avatar"
                        />
                    </div>
                    {step === STEP.LOGIN && (
                        <div className="login-content">
                            <LoginForm />
                            <div className="change-step">
                                <span>New to WYR? </span>
                                <a className="link" onClick={this.handleRegister}>
                                    Create new account
                                </a>
                            </div>
                        </div>
                    )}
                    {step === STEP.REGISTRATION && (
                        <div className="login-content">
                            <RegisterForm />
                            <div className="change-step">
                                <span>Already have an account?</span>
                                <a className="link" onClick={this.handleLogin}>
                                    Sign in
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({authedUser, users, error, loadingBar}, props) => {
    const searchQuery = props.location && props.location.search;
    const query = getQueryParams(searchQuery);

    return {
        isAuthed: authedUser,
        next: query && query.next
    }
};

export default connect(mapStateToProps)(Login);
