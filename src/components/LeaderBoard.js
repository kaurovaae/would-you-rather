import React, {Component}                   from 'react';
import {connect}                            from 'react-redux';
import LeaderCard                           from './LeaderCard';

class LeaderBoard extends Component {
    render() {
        const {leadersIds} = this.props;

        return (
            <ul>
                {leadersIds.map((id, place) => (
                    <li key={id}>
                        <LeaderCard id={id} place={place + 1} />
                    </li>
                ))}
            </ul>
        )
    }
}

const mapStateToProps = ({users}) => {
    return {
        leadersIds: Object.keys(users).sort((a, b) =>
            (Object.keys(users[b].answers).length + users[b].questions.length)
            - (Object.keys(users[a].answers).length + users[a].questions.length))
    }
};

export default connect(mapStateToProps)(LeaderBoard);
