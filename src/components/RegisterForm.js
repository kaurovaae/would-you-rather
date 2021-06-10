import React, {Component, Fragment} from 'react';
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
        repeatPassword: '',
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

        const {name, password, repeatPassword} = this.state;

        if (password === '' || password !== repeatPassword) {
            return;
        }

        this.props.dispatch(handleAddUser(name, password));
    };

    render() {
        const {name, password, repeatPassword, step} = this.state;
        const {loading} = this.props;

        const isLoginStep = step === STEP.LOGIN;
        const disabled = loading
            || (!isLoginStep && password === '')
            || (isLoginStep && name === '')
            || password !== repeatPassword;

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
                        className="input"
                    />
                ) : (
                    <Fragment>
                        <input
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            autoComplete="off"
                            className="password"
                            type="password"
                        />
                        <input
                            placeholder="Repeat password"
                            name="repeatPassword"
                            value={repeatPassword}
                            onChange={this.handleChange}
                            autoComplete="off"
                            className="repeat"
                            type="password"
                        />
                    </Fragment>
                )}
                <button
                    className="btn"
                    type="submit"
                    disabled={disabled}
                >
                    Continue
                </button>
                <div className="empty" />
            </form>
        )
    }
}

const mapStateToProps = ({error, loadingBar}) => {
    return {
        loading: loadingBar.default === 1
    }
};

export default connect(mapStateToProps)(RegisterForm);
