import React, {Component}                   from 'react';
import {connect}                            from 'react-redux';
import {handleLogin}                        from "../actions/authedUser";
import {handleClearError}                   from '../actions/error';

const STEP = {
    LOGIN: 'login',
    PASSWORD: 'password'
};

class LoginForm extends Component {
    state = {
        selectedUser: 'none',
        password: '',
        step: STEP.LOGIN
    };

    selectUser = (e) => {
        e.preventDefault();

        const selectedUser = e.target.value;

        this.setState(prevState => ({
            ...prevState,
            selectedUser
        }));

        this.props.dispatch(handleClearError());
    };

    handleChange = (e) => {
        e.preventDefault();

        const password = e.target.value;

        this.setState(prevState => ({
            ...prevState,
            password
        }));
        this.props.dispatch(handleClearError());
    };

    handleLogin = (e) => {
        e.preventDefault();

        const {selectedUser} = this.state;

        if (selectedUser === 'none') {
            return;
        }

        this.setState(prevState => ({
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

        this.props.dispatch(handleLogin(selectedUser, password));
    };

    render() {
        const {selectedUser, password, step} = this.state;
        const {users, error, loading} = this.props;

        const isLoginStep = step === STEP.LOGIN;

        return (
            <form className="login-content" onSubmit={isLoginStep ? this.handleLogin : this.handleSubmit}>
                <h3>Sign In</h3>
                {isLoginStep ? (
                    <select className="input" value={selectedUser} onChange={this.selectUser} disabled={loading}>
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
                        autoComplete="off"
                        className="input"
                        type="password"
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
        )
    }
}

const mapStateToProps = ({users, error, loadingBar}) => {
    return {
        users: Object.keys(users).map(id => ({
            id,
            name: users[id].name
        })),
        error,
        loading: loadingBar.default === 1
    }
};

export default connect(mapStateToProps)(LoginForm);
