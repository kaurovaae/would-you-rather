import React, {Component}               from 'react';
import {connect}                        from 'react-redux';
import DashboardCard                    from './DashboardCard';
import ErrorMessage                     from "./ErrorMessage";

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

                {!!questions.length ? (
                    <ul>
                        {questions.map(id => (
                            <li key={id}>
                                <DashboardCard id={id}/>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ErrorMessage
                        title="No questions"
                        message="There are no questions yet. Please, try again later."
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = ({questions, users, authedUser}) => {
    const answeredIds = Object.keys(users[authedUser].answers);

    return {
        answeredIds: answeredIds
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        unAnsweredIds: Object.keys(questions)
            .filter(question => !answeredIds.includes(question))
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
};

export default connect(mapStateToProps)(Dashboard);
