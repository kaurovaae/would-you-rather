import React, {Component}                   from 'react';
import {connect}                            from 'react-redux';
import {handleAddUser}                      from "../actions/users";
import {handleClearError}                   from "../actions/error";

const STEP = {
    LOGIN: 'login',
    PASSWORD: 'password'
};

class RegisterForm extends Component {
    state = {
        name: '',
        password: '',
        step: STEP.LOGIN
    };

    handleChange = (e) => {
        e.preventDefault();

        const value = e.target.value;
        const field = e.target.name;

        this.setState(prevState => ({
            ...prevState,
            [field]: value
        }));

        this.props.dispatch(handleClearError());
    };

    handleLogin = (e) => {
        e.preventDefault();

        const {name} = this.state;

        if (name === '') {
            return;
        }

        this.setState(prevState => ({
            ...prevState,
            step: STEP.PASSWORD
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {name, password} = this.state;

        if (password === '') {
            return;
        }

        this.props.dispatch(handleAddUser(name, password));
    };

    render() {
        const {name, password, step} = this.state;
        const {error, loading} = this.props;

        const isLoginStep = step === STEP.LOGIN;

        return (
            <form className="login-content" onSubmit={isLoginStep ? this.handleLogin : this.handleSubmit}>
                <h3>Create account</h3>
                {isLoginStep ? (
                    <input
                        placeholder="Enter your name"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                ) : (
                    <input
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                )}
                <button
                    className="btn"
                    type="submit"
                    disabled={(!isLoginStep && password === '') || (isLoginStep && name === '') || loading}
                >
                    Continue
                </button>
                <div className="error">{error}</div>
            </form>
        )
    }
}

const mapStateToProps = ({error, loadingBar}) => {
    return {
        error,
        loading: loadingBar.default === 1
    }
};

export default connect(mapStateToProps)(RegisterForm);
