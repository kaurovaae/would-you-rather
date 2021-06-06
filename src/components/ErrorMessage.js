import React                            from 'react';
import PropTypes                        from "prop-types";

const ErrorMessage = (props) => {
    const {title, message} = props;

    return (
        <div className="error-block">
            <div className="block-container">
            <span className="question-card-header">
                {title}
            </span>
                <div className="block-content">
                    {message}
                </div>
            </div>
        </div>
    )
};

ErrorMessage.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default ErrorMessage;
