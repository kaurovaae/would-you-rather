import React, {Component}               from 'react';
import {NavLink}                        from "react-router-dom";
import {connect}                        from 'react-redux';
import {withRouter}                     from "react-router-dom";
import {handleLogout}                   from '../actions/authedUser';

class Navigation extends Component {

    handleLogout = (e) => {
        e.preventDefault();

        this.props.dispatch(handleLogout());
        this.props.history.push('/');
    };

    render() {
        const {authorName, authorAvatar} = this.props;

        return (
            <div className="nav">
                <div>
                    <NavLink to='/' exact className="nav-item" activeClassName="active">
                        Home
                    </NavLink>
                    <NavLink to='/add' className="nav-item" activeClassName="active">
                        New Question
                    </NavLink>
                    <NavLink to='/leaderboard' className="nav-item" activeClassName="active">
                        Leader Board
                    </NavLink>
                    {authorName && (
                        <div className="user-nav">
                            <span>Hello, {authorName}</span>
                            <img
                                src={authorAvatar}
                                alt="avatar"
                                className="nav-avatar"
                            />
                            <div className="nav-item" onClick={this.handleLogout}>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({authedUser, users}) => {
    const user = users[authedUser];
    return {
        authorName: user ? user.name : null,
        authorAvatar: user ? users[authedUser].avatarURL : null
    }
};

export default withRouter(connect(mapStateToProps)(Navigation));
