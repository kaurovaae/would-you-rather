import React, {Component}               from 'react';
import {NavLink}                        from "react-router-dom";
import {connect}                        from 'react-redux';

class Nav extends Component {
    render() {
        const {authorName, authorAvatar} = this.props;

        return (
            <div className="nav">
                <div>
                    <NavLink to='/' exact className="nav-item" activeClassName="active">
                        Home
                    </NavLink>
                    <NavLink to='/new' className="nav-item" activeClassName="active">
                        New Question
                    </NavLink>
                    <NavLink to='/leader-board' className="nav-item" activeClassName="active">
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
                            <div className="nav-item">
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

export default connect(mapStateToProps)(Nav);
