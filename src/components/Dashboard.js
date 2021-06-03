import React, {Component}               from 'react';
import {connect}                        from 'react-redux';
import Question                         from './Question';

class Dashboard extends Component {
    render() {
        const {questionIds} = this.props;

        return (
            <div>
                <h3 className='center'>Questions</h3>
                <ul className='dashboard-list'>
                    {questionIds.map(id => (
                        <li key={id}>
                            <Question id={id}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({questions}) => {
    return {
        questionIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
};

export default connect(mapStateToProps)(Dashboard);
