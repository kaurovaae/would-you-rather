import React, {Component}                   from 'react';
import {connect}                            from 'react-redux';

class LeaderCard extends Component {
    render() {
        const {name, avatarUrl, answered, created, isActive, place} = this.props;

        return (
            <div className={`block-container ${isActive ? 'active-leader' : ''}`}>
                <div className="card-header">
                    {place} place
                </div>
                <div className="block-content">
                    <div className="leader-block">
                        <img
                            src={avatarUrl}
                            alt="avatar"
                            className="avatar-middle"
                        />
                    </div>
                    <div className="leader-block">
                        <h3>{name}</h3>
                        <div className="stats-line">
                            <div>Answered questions:</div>
                            <div>{answered}</div>
                        </div>
                        <div className="stats-line">
                            <div>Created questions:</div>
                            <div>{created}</div>
                        </div>
                    </div>
                    <div className="leader-block">
                        <div className="block-container">
                            <div className="card-header">
                                Score
                            </div>
                            <div className="block-content">
                                <div className="points">{answered + created}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({users, authedUser}, {id, place}) => {
    const user = users[id];
    const {name, avatarURL, answers, questions} = user;

    return {
        name,
        avatarUrl: avatarURL,
        answered: Object.keys(answers).length,
        created: questions.length,
        isActive: id === authedUser,
        place
    }
};

export default connect(mapStateToProps)(LeaderCard);
