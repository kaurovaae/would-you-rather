import React, {Component}               from 'react';
import {connect}                        from 'react-redux';
import {withRouter}                     from "react-router-dom";
import {handleSaveAnswer}               from '../actions/questions';

class QuestionPage extends Component {
    state = {
        answer: "optionOne"
    };

    handleChange = (answer) => {
        this.setState(() => ({
            answer
        }))
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {answer} = this.state;
        const {dispatch, question} = this.props;
        dispatch(handleSaveAnswer(question.id, answer));
    };

    render() {
        const {answer} = this.state;
        const {question, author} = this.props;

        if (!question) {
            return (
                <div className="block-container">
                    <span className="question-card-header">
                        Not found
                    </span>
                    <div className="block-content">
                        The question doesn't exist. Please, try again with another id.
                    </div>
                </div>
            )
        }

        const {name, avatarURL} = author;
        const {optionOne, optionTwo} = question;

        // TODO: redirect to answered page after submit

        return (
            <div className="block-container">
                <div className="question-card-header">
                    {name} asks:
                </div>
                <div className="block-content">
                    <div className="question-card-left">
                        <img
                            src={avatarURL}
                            alt={`Avatar of ${name}`}
                            className="avatar"
                        />
                        <span />
                    </div>
                    <form className="question-card-question" onSubmit={this.handleSubmit}>
                        <h3>Would you rather</h3>
                        <div className="question-options">
                            <div>
                                <input
                                    type="radio"
                                    value="optionOne"
                                    checked={answer === "optionOne"}
                                    onChange={e => this.handleChange(e.target.value)}
                                />
                                <label htmlFor="optionOne" onClick={() => this.handleChange("optionOne")}>
                                    {optionOne.text}
                                </label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    value="optionTwo"
                                    checked={answer === "optionTwo"}
                                    onChange={e => this.handleChange(e.target.value)}
                                />
                                <label htmlFor="optionTwo" onClick={() => this.handleChange("optionTwo")}>
                                    {optionTwo.text}
                                </label>
                            </div>
                        </div>

                        <button
                            className="question-card-button"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({questions, users}, props) => {
    const {id} = props.match.params;
    const question = questions[id];

    return {
        question,
        author: question ? users[question.author] : null
    }
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
