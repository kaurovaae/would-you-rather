import React, {Component}               from 'react';
import {connect}                        from 'react-redux';
import {handleSaveAnswer}               from '../actions/questions';
import QuestionCard                     from "./QuestionCard";
import ErrorMessage                     from "./ErrorMessage";
import Answer                           from "./Answer";

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
        const {optionOne, optionTwo} = question;

        let content;
        if (hasAnswered) {
            const firstCount = optionOne.votes.length;
            const secondCount = optionTwo.votes.length;
            const allCount = firstCount + secondCount;

            content = (
                <div className="question-card-question">
                    <h3>Results:</h3>
                    <div className="answers">
                        <Answer
                            isActive={answer === "optionOne"}
                            filled={firstCount}
                            all={allCount}
                            text={optionOne.text}
                        />
                        <Answer
                            isActive={answer === "optionTwo"}
                            filled={secondCount}
                            all={allCount}
                            text={optionTwo.text}
                        />
                    </div>
                </div>
            )
        } else {
            content = (
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
            )
        }

        return (
            <QuestionCard
                title={hasAnswered ? `Asked by ${name}` : `${name} asks:`}
                avatarUrl={avatarURL}
            >
                {content}
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
