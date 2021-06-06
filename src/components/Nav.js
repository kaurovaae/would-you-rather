import React                            from 'react';
import {NavLink}                        from "react-router-dom";

const Nav = () => {
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
            </div>
        </div>
    )
};

export default Nav;
