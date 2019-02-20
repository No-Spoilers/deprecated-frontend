import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

const header = (props) => {
    let usernamefield;

    if (!props.state.token) {
        usernamefield = (
            <span>
                <span className="right-span log-in-title">Log In:</span>

                <span className="right-span log-in-email-span">
                    <label htmlFor="logInEmail">E-mail</label>
                    <input 
                        type="text" 
                        placeholder="Enter Email" 
                        name="logInEmail" 
                        value={props.state.inputEmail}
                        onChange={props.handleChange('inputEmail')}
                    />
                </span>

                <span className="right-span log-in-password-span">
                    <label htmlFor="logInPassword">Password:</label>
                    <input 
                        type="password" 
                        placeholder="Enter Password" 
                        name="logInPassword"
                        value={props.state.inputPassword}
                        onChange={props.handleChange('inputPassword')}
                    />
                </span>

                <span className="right-span log-in-button-span">
                    {props.state.loading ? <span>LOADING</span> : <span><button onClick={props.logIn}>Login</button> <button onClick={props.signUpModal}>Sign Up</button></span>}
                </span>
            </span>
        )
    } else {
        usernamefield = (
            <span>
                <span className="right-span username-field">{props.state.userInfo.userName}</span>

                <span className="right-span log-out-button-span">
                    <button onClick={props.logOut}>Log Out</button>
                </span>
            </span>
        )
    }
    return (
        <div className="header-div">
            <span className="left-span site-name">
                <NavLink to="/">
                    No-Spoilers
                </NavLink>
            </span>
            
            {usernamefield}
        </div>
    )
};

export default header;
