import React, {Component}           from 'react';
import {connect}                    from 'react-redux';
import {handleAddQuestion}          from "../actions/questions";
import {Redirect}                   from "react-router-dom";

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false
    };

    handleChange = (e) => {
        const text = e.target.value;
        const fieldName = e.target.name;

        this.setState(() => ({
            [fieldName]: text
        }))
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {optionOneText, optionTwoText} = this.state;
        const {dispatch, id} = this.props;

        if (optionOneText === '' || optionTwoText === '') {
            return;
        }

        dispatch(handleAddQuestion(optionOneText, optionTwoText));

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: !id
        }))
    };

    render() {
        const {optionOneText, optionTwoText, toHome} = this.state;

        if (toHome === true) {
            return <Redirect to="/" />
        }

        const optionOneLeft = 80 - optionOneText.length;
        const optionTwoLeft = 80 - optionTwoText.length;

        return (
            <div className="block-container">
                <div className="container-nav">
                    <h2 className="center">Create New Question</h2>
                </div>
                <div className="question-content">
                    <form className="new-question" onSubmit={this.handleSubmit}>
                        <div>Complete the question:</div>
                        <h3>Would you rather ...</h3>
                        <input
                            placeholder="Enter Option One Text Here"
                            name="optionOneText"
                            value={optionOneText}
                            onChange={this.handleChange}
                            maxLength={80}
                            className="input"
                            autoComplete="off"
                        />
                        {optionOneLeft <= 24 && (
                            <div className="question-length">
                                {optionOneLeft}
                            </div>
                        )}
                        <span>OR</span>
                        <input
                            placeholder="Enter Option One Text Here"
                            name="optionTwoText"
                            value={optionTwoText}
                            onChange={this.handleChange}
                            maxLength={80}
                            className="input"
                            autoComplete="off"
                        />
                        {optionTwoLeft <= 24 && (
                            <div className="question-length">
                                {optionTwoLeft}
                            </div>
                        )}
                        <button
                            className="btn"
                            type="submit"
                            disabled={optionOneText === '' || optionTwoText === ''}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect()(NewQuestion);
