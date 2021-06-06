import React, {Component}               from 'react';
import {connect}                        from 'react-redux';
import {formatQuestion}                 from '../utils/helpers';
import {Link}                           from "react-router-dom";

class QuestionCard extends Component {
    render() {
        const {question, id, answeredMode} = this.props;
        const {authorName, authorAvatar, optionOne} = question;

        return (
            <div className="block-container">
                <div className="question-card-header">
                    {authorName} asks:
                </div>
                <div className="block-content">
                    <div className="question-card-left">
                        <img
                            src={authorAvatar}
                            alt={`Avatar of ${authorName}`}
                            className="avatar"
                        />
                        <span />
                    </div>
                    <div className="question-card-question">
                        <h3>Would you rather</h3>
                        <div className="question-card-short">
                            ...{optionOne.text}
                        </div>
                        <Link className="question-card-button" to={answeredMode ? `/answer/${id}` : `/question/${id}`}>
                            View Poll
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({questions, users, authedUser}, {id}) => {
    const question = questions[id];

    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
};

export default connect(mapStateToProps)(QuestionCard);
