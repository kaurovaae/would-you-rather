import React                    from 'react';
import ErrorMessage             from "./ErrorMessage";

const NotFound = () => {

    return (
        <ErrorMessage
            title="404"
            message="The page you're looking doesn't exist"
        />
    )
};

export default NotFound;
