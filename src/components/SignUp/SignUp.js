import React from 'react';

import './SignUp.css';

const signUp = (props) => {
    console.log('--> props', props);
    return (
        <form className="sign-up-form">
            <h3>Sign Up:</h3>
            <p>
                <label htmlFor="signUpUserName"><b>Choose a User Name</b></label>
                <input 
                    type="text" 
                    placeholder="Enter User Name" 
                    name="signUpUserName" 
                    value={props.state.inputName}
                    onChange={props.handleChange('inputName')}
                />
            </p>
            <p>
            <label htmlFor="signUpEmail"><b>Email:</b></label>
                <input 
                    type="text" 
                    placeholder="Enter Email" 
                    name="signUpEmail" 
                    value={props.state.inputEmail}
                    onChange={props.handleChange('inputEmail')}
                />
            </p>
            <p>
            <label htmlFor="signUpPassword"><b>Password:</b></label>
                <input 
                    type="password" 
                    placeholder="Enter Password" 
                    name="signUpPassword"
                    value={props.state.inputPassword} 
                    onChange={props.handleChange('inputPassword')}
                />
            </p>
            {props.state.loading ? <p>LOADING</p> : <p><button onClick={props.signUp}>Sign Up</button></p>}
        </form>
    )
};

export default signUp;
