import React, {Component}               from 'react';
import {connect}                        from 'react-redux';
import QuestionCard                     from './QuestionCard';

class Dashboard extends Component {
    state = {
        answeredMode: false
    };

    handleChangeMode = (isAnsweredMode) => {
        this.setState(() => ({
            answeredMode:  isAnsweredMode
        }));
    };

    render() {
        const {answeredMode} = this.state;
        const {answeredIds, unAnsweredIds} = this.props;

        const questions = answeredMode ? answeredIds : unAnsweredIds;

        return (
            <div className="block-container">
                <div className="dashboard-nav">
                    <div
                        className={answeredMode ? "" : "dashboard-nav-active"}
                        onClick={() => this.handleChangeMode(false)}
                    >
                        Unanswered Questions
                    </div>
                    <div
                        className={answeredMode ? "dashboard-nav-active" : ""}
                        onClick={() => this.handleChangeMode(true)}
                    >
                        Answered Questions
                    </div>
                </div>

                <ul>
                    {questions.map(id => (
                        <li key={id}>
                            <QuestionCard answeredMode={answeredMode} id={id}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({questions, users, authedUser}) => {
    const answeredIds = Object.keys(users[authedUser].answers);

    return {
        answeredIds: answeredIds
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        unAnsweredIds: Object.keys(questions)
            .filter(question => !answeredIds.includes(question))
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
};

export default connect(mapStateToProps)(Dashboard);
