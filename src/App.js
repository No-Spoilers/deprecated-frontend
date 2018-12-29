import React, { Component } from 'react';
import './App.css';
import axios from './axios-instance';

class App extends Component {
    state = {
        loading: false,
        token: null,
        userId: null,
        userInfo: null,
        inputName: "Test User",
        inputEmail: "test@email.com",
        inputPassword: "new test password"
    }

    logIn = async () => {
        try {
            const credentials = {
                email: this.state.inputEmail,
                password: this.state.inputPassword
            }
            console.log('--> credentials :', JSON.stringify(credentials, null, 4));
            this.setState({loading:true})
            const {data} = await axios.post('/login', credentials)
            console.log('--> loginRepsonse :', data);
            this.setState({
                token: data.token, 
                userId: data.userId, 
                userInfo: data,
                loading: false
            })
        } catch (err) {
            console.log(`Connection error: ${err}`)
            console.log(err)
            this.setState({loading:false})
        }
    }

    signUp = async () => {
        try {
            const formData = {
                userName: this.state.inputName,
                email: this.state.inputEmail,
                password: this.state.inputPassword
            }
            console.log('--> formData :', JSON.stringify(formData, null, 4));
            this.setState({loading:true})
            const signupResponse = await axios.post('/signup', formData)
            console.log('--> signupResponse :', signupResponse.data);
        } catch (err) {
            console.log(`Signup error: ${err}`)
            console.log(err)
        }
        this.setState({loading:false})
    }

    handleChange = (field) => (event) => {
        const state = this.state
        state[field] = event.target.value
        this.setState(state)
    }

    render() {
        if (!this.state.token || !this.state.userId) {
            return (
                <div>
                    <form>
                        <h3>Log In:</h3>
                        <p>
                            <label htmlFor="email"><b>email</b></label>
                            <input 
                                type="text" 
                                placeholder="Enter Email" 
                                name="email" 
                                value={this.state.inputEmail}
                                onChange={this.handleChange('inputEmail')}
                            />
                        </p>
                        <p>
                            Password: 
                            <input 
                                type="password" 
                                placeholder="Enter Password" 
                                name="password"
                                value={this.state.inputPassword}
                                onChange={this.handleChange('inputPassword')}
                            />
                        </p>
                        {this.state.loading ? <p>LOADING</p> : <p onClick={this.logIn}>Login</p>}
                    </form>
                    <form>
                        <h3>Sign Up:</h3>
                        <p>
                            <label htmlFor="userName"><b>userName</b></label>
                            <input 
                                type="text" 
                                placeholder="Enter User Name" 
                                name="userName" 
                                value={this.state.inputName}
                                onChange={this.handleChange('inputName')}
                            />
                        </p>
                        <p>
                            Email:
                            <input 
                                type="text" 
                                placeholder="Enter Email" 
                                name="email" 
                                value={this.state.inputEmail}
                                onChange={this.handleChange('inputEmail')}
                            />
                        </p>
                        <p>
                            Password: 
                            <input 
                                type="password" 
                                placeholder="Enter Password" 
                                name="password"
                                value={this.state.inputPassword} 
                                onChange={this.handleChange('inputPassword')}
                            />
                        </p>
                        {this.state.loading ? <p>LOADING</p> : <p onClick={this.signUp}>Sign Up</p>}
                    </form>
                </div>
            )
        }

        return (
            <div>
                <p>
                    Token: {this.state.token}
                </p>
                <p>
                    User ID: {this.state.userId}
                </p>
                <p>
                    User Info: 
                </p>
                <pre>
                    {JSON.stringify(this.state.userInfo, null, 2)}
                </pre>
            </div>
        );
    }
}

export default App;
