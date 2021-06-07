import React                    from 'react';
import PropTypes                from 'prop-types';

const QuestionCard = (props) => {
    const {title, avatarUrl, children} = props;

    return (
        <div className="block-container">
            <div className="card-header">
                {title}
            </div>
            <div className="block-content">
                <div className="question-card-left">
                    <img
                        src={avatarUrl}
                        alt="avatar"
                        className="avatar"
                    />
                </div>
                {children}
            </div>
        </div>
    )
};

QuestionCard.propTypes = {
    title: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default QuestionCard;
