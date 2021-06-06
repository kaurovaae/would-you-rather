import React, {Component}               from 'react';
import {connect}                        from 'react-redux';
import {Redirect}                       from "react-router-dom";
import {handleSaveAnswer}               from '../actions/questions';
import QuestionCard                     from "./QuestionCard";
import ErrorMessage                     from "./ErrorMessage";

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
        const {question, author, hasAnswered} = this.props;

        if (!question) {
            return (
                <ErrorMessage
                    title="Not found"
                    message="The question doesn't exist. Please, try again with another id."
                />
            )
        }

        const {name, avatarURL} = author;
        const {optionOne, optionTwo, id} = question;

        if (hasAnswered) {
            return <Redirect to={`/answer/${id}`} />
        }

        return (
            <QuestionCard
                title={`${name} asks:`}
                avatarUrl={avatarURL}
            >
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
            </QuestionCard>
        );
    }
}

const mapStateToProps = ({questions, users, authedUser}, props) => {
    const {id} = props.match.params;

    const question = questions[id];
    const user = users[authedUser];

    return {
        question,
        author: question ? users[question.author] : null,
        hasAnswered: user ? !!user.answers[id] : null
    }
};

export default connect(mapStateToProps)(QuestionPage);
