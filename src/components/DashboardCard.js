import React, {Component}               from 'react';
import {connect}                        from 'react-redux';
import {formatQuestion}                 from '../utils/helpers';
import {Link}                           from "react-router-dom";
import QuestionCard                     from "./QuestionCard";

class DashboardCard extends Component {
    render() {
        const {question, id} = this.props;
        const {authorName, authorAvatar, optionOne} = question;

        return (
            <QuestionCard
                title={`${authorName} asks:`}
                avatarUrl={authorAvatar}
            >
                <div className="question-card-question">
                    <h3>Would you rather</h3>
                    <div className="question-card-short">
                        ...{optionOne.text}
                    </div>
                    <Link className="question-card-button" to={`/questions/${id}`}>
                        View Poll
                    </Link>
                </div>
            </QuestionCard>
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

export default connect(mapStateToProps)(DashboardCard);
