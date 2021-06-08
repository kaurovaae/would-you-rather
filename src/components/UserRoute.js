import React, {Component}                           from 'react';
import {connect}                                    from 'react-redux';
import {
    Redirect,
    Route
}                                                   from "react-router-dom";
import {withRouter}                                 from "react-router-dom";

class UserRoute extends Component {
    render () {
        const {isAuthed, next, ...otherProps} = this.props;

        if (!isAuthed) {
            return <Redirect to={`/login?next=${next}`} />
        }

        return <Route {...otherProps} />
    }
}

const mapStateToProps = ({authedUser}, props) => {
    return {
        ...props,
        isAuthed: authedUser,
        next: props.location.pathname
    }
};

export default withRouter(connect(mapStateToProps)(UserRoute));
