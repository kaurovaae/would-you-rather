import React, {Component}                   from 'react';
import {connect}                            from 'react-redux';
import {Redirect}                           from "react-router-dom";
import {handleLogin}                        from "../actions/authedUser";
import {withRouter}                         from "react-router-dom";
import getQueryParams                       from "../utils/getQueryParams";
import {handleClearError}                   from '../actions/error';

import reactLogo                            from '../logo.svg';

const STEP = {
    LOGIN: 'login',
    PASSWORD: 'password'
};

class Login extends Component {
    state = {
        selectedUser: 'none',
        password: '',
        step: STEP.LOGIN
    };

    selectUser = (e) => {
        e.preventDefault();

        const selectedUser = e.target.value;

        this.setState((prevState) => ({
            ...prevState,
            selectedUser
        }));

        this.props.dispatch(handleClearError());
    };

    handleChange = (e) => {
        e.preventDefault();

        const password = e.target.value;

        this.setState((prevState) => ({
            ...prevState,
            password
        }))
    };

    handleLogin = (e) => {
        e.preventDefault();

        const {selectedUser} = this.state;

        if (selectedUser === 'none') {
            return;
        }

        this.setState((prevState) => ({
            ...prevState,
            step: STEP.PASSWORD
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {selectedUser, password} = this.state;

        if (password === '') {
            return;
        }

        const {dispatch, history, next} = this.props;

        dispatch(handleLogin(selectedUser, password));
        history.push(next);
    };

    render() {
        const {selectedUser, password, step} = this.state;
        const {isAuthed, next, users, error, loading} = this.props;

        if (isAuthed) {
            return <Redirect to={next} />
        }

        const isLoginStep = step === STEP.LOGIN;

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
                    <form className="login-content" onSubmit={isLoginStep ? this.handleLogin : this.handleSubmit}>
                        <h3>Sign In</h3>
                        {isLoginStep ? (
                            <select value={selectedUser} onChange={this.selectUser} disabled={loading}>
                                <option value='none'>Select User</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                placeholder="Enter password"
                                value={password}
                                onChange={this.handleChange}
                            />
                        )}
                        <button
                            className="btn"
                            type="submit"
                            disabled={(!isLoginStep && password === '') || (isLoginStep && selectedUser === "none") || loading}
                        >
                            Sign In
                        </button>
                        <div className="error">{error}</div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({authedUser, users, error, loadingBar}, props) => {
    const searchQuery = props.location && props.location.search;
    const query = getQueryParams(searchQuery);

    return {
        ...props,
        isAuthed: authedUser,
        next: query && query.next,
        users: Object.keys(users).map(id => ({
            id,
            name: users[id].name
        })),
        error,
        loading: loadingBar.default === 1
    }
};

export default withRouter(connect(mapStateToProps)(Login));
