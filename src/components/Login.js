import React, {Component}                   from 'react';
import {connect}                            from 'react-redux';
import {Redirect}                           from "react-router-dom";
import {handleLogin}                        from "../actions/authedUser";
import {withRouter}                         from "react-router-dom";
import getQueryParams                       from "../utils/getQueryParams";

import reactLogo                            from '../logo.svg';

class Login extends Component {
    state = {
        selectedUser: 'none',
        error: ''
    };

    selectUser = (e) => {
        e.preventDefault();

        const selectedUser = e.target.value;

        this.setState(() => ({
            selectedUser,
            error: ''
        }))
    };

    handleLogin = (e) => {
        e.preventDefault();

        const {selectedUser} = this.state;

        if (selectedUser === 'none') {
            this.setState((prevState) => ({
                ...prevState,
                error: 'Please, select User'
            }));
            return;
        }

        const {dispatch, history, next} = this.props;

        dispatch(handleLogin(selectedUser));
        history.push(next);
    };

    render() {
        const {selectedUser, error} = this.state;
        const {isAuthed, next, users} = this.props;

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
                    <div className="login-content">
                        <h3>Sign In</h3>
                        <select value={selectedUser} onChange={this.selectUser}>
                            <option value='none'>Select User</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <button
                            className="btn"
                            onClick={this.handleLogin}
                            disabled={selectedUser === "none"}
                        >
                            Sign In
                        </button>
                        <div className="error">{error}</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({authedUser, users}, props) => {
    const searchQuery = props.location && props.location.search;
    const query = getQueryParams(searchQuery);

    return {
        ...props,
        isAuthed: authedUser,
        next: query && query.next,
        users: Object.keys(users).map(id => ({
            id,
            name: users[id].name
        }))
    }
};

export default withRouter(connect(mapStateToProps)(Login));
