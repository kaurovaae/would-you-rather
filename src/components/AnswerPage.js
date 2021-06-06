import React, {Component}               from 'react';
import {connect}                        from 'react-redux';
import QuestionCard                     from "./QuestionCard";
import Answer                           from './Answer';
import {Redirect}                       from "react-router-dom";

class AnswerPage extends Component {
    render() {
        const {question, author, answer, questionId} = this.props;

        if (!answer) {
            return <Redirect to={`/question/${questionId}`} />
        }

        const {name, avatarURL} = author;
        const {optionOne, optionTwo} = question;

        const firstCount = optionOne.votes.length;
        const secondCount = optionTwo.votes.length;
        const allCount = firstCount + secondCount;

        return (
            <QuestionCard
                title={`Asked by: ${name}`}
                avatarUrl={avatarURL}
            >
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
            </QuestionCard>
        )
    }
}

const mapStateToProps = ({questions, users, authedUser}, props) => {
    const {id} = props.match.params;

    const question = questions[id];
    const user = users[authedUser];

    return {
        question,
        author: question ? users[question.author] : null,
        answer: user ? user.answers[id] : null,
        questionId: id
    }
};

export default connect(mapStateToProps)(AnswerPage);
