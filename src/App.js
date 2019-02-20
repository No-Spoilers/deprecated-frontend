import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import axios from './axios-instance';

import Header from './components/Header/Header'
import Modal from './components/Modal/Modal'
import Content from './components/Content/Content'
import Series from './components/Series/Series'

import './App.css';

class App extends Component {
    state = {
        loading: false,
        token: null,
        userId: null,
        userInfo: null,
        inputName: "Test User",
        inputEmail: "test@email.com",
        inputPassword: "new test password",
        modal: null,
        modalMessage: "",
        recentUpdates: [],
        itemStore: {}
    }

    async componentDidMount() {
        console.log('-- App componentDidMount --');
        this.getLatest()
    }

    getLatest = async () => {
        try {
            this.setState({loading: true});

            const response = await axios.get('/items/latest');
            console.log('--> /items/latest response.data', response.data);
            this.setState({recentUpdates: response.data, loading: false});
        } catch(e) {
            console.log(`Axios error: ${e}`);
            this.setState({ loading: false });
        }
    }

    logIn = async () => {
        try {
            const credentials = {
                email: this.state.inputEmail,
                password: this.state.inputPassword
            }
            this.setState({loading:true})
            const logInResponse = await axios.post('/login', credentials)
            console.log('--> logInResponse :', logInResponse.data);
            this.setState({
                token: logInResponse.data.token, 
                userId: logInResponse.data.userId, 
                userInfo: logInResponse.data,
                loading: false
            })
        } catch (err) {
            console.log(`Connection error: ${err}`)
            console.log(err)
            this.setState({loading:false})
        }
    }

    logOut = async () => {
        try {
            this.setState({
                token: null, 
                userId: null, 
                userInfo: null,
                loading: false,
                inputName: "",
                inputEmail: "",
                inputPassword: "",
                modal: { active: false, content: null }
            })
        } catch (err) {
            console.log(`Connection error: ${err}`)
            console.log(err)
            this.setState({loading:false})
        }
    }

    signUp = async () => {
        try {
            console.log('Signup clicked!')
            const formData = {
                userName: this.state.inputName,
                email: this.state.inputEmail,
                password: this.state.inputPassword
            }
            this.setState({loading:true})
            const signupResponse = await axios.post('/signup', formData)
            this.setState({
                loading: false, 
                modal: 'MESSAGE',
                modalMessage: signupResponse.data.msg
            })
            console.log('--> signupResponse :', signupResponse.data);
        } catch (err) {
            console.log(`Signup error: ${err}`)
            console.log(err)
        }
        this.setState({loading:false})
    }

    signUpModal = async () => {
        console.log('signUpModal triggered!')
        try {
            this.setState({ modal: 'SIGN_UP' })
        } catch (err) {
            console.log(`signUpModal error: ${err}`)
            console.log(err)
        }
    }

    newItem = async () => {
        let postItemResponse
        try {
            console.log('New Item clicked!')
            const formData = {
                title: this.state.inputTitle,
                creator: [this.state.inputCreator],
                added_by: this.state.userId
            }
            this.setState({ loading: true })
            postItemResponse = await axios.post(`/item`, formData)
            console.log('--> postItemResponse :', postItemResponse.data);
        } catch (err) {
            console.log(`Signup error: ${err}`)
            console.log(err)
        }
        this.setState({ loading: false })
        this.getLatest()
        this.closeModal()
        // redirect to new item page
    }

    newItemModal = async () => {
        console.log('newItemModal triggered!')
        try {
            this.setState({ modal: 'NEW_ITEM' })
        } catch (err) {
            console.log(`newItemModal error: ${err}`)
            console.log(err)
        }
    }

    updateContent = async () => {
        let postContentResponse
        try {
            console.log('updateContent clicked!')
            const formData = {
                updateText: this.state.activeText,
                addedBy: this.state.userId
            }
            postContentResponse = await axios.post(`/item/${this.state.currentSlug}`, formData)
            console.log('--> postContentResponse :', postContentResponse.data);
        } catch (err) {
            console.log(`Signup error: ${err}`)
            console.log(err)
        }
        
        this.loadItem(this.state.currentSlug)
        this.closeModal()
    }

    openModal = async (modalType, slug = '', content = '') => {
        console.log(`openModal ${modalType} triggered!`)
        try {
            this.setState({ modal: modalType, currentSlug: slug, activeText: content })
        } catch (err) {
            console.log(`openModal ${modalType} error: ${err}`)
            console.log(err)
        }
    }

    closeModal = async () => {
        console.log('Modal closed!')
        try {
            this.setState({ modal: null, modalMessage: null })
        } catch (err) {
            console.log(`modal close error: ${err}`)
            console.log(err)
        }
    }

    handleChange = (field) => (event) => {
        const state = this.state
        state[field] = event.target.value
        this.setState(state)
    }

    loadItem = async (item) => {
        if (this.state.itemStore[item] && this.state.itemStore[item].loading) return
        let tempStore = this.state.itemStore
        tempStore[item] = { loading: true }
        this.setState({ itemStore: tempStore })

        const response = await axios.get(`/item/${item}`)
        tempStore[item] = { loading: false, data: response.data }

        this.setState({ itemStore: tempStore })
    }

    render() {
        return (
            <BrowserRouter>

                <div>
                    <Header 
                        state={this.state}
                        handleChange={this.handleChange}
                        logIn={this.logIn}
                        logOut={this.logOut}
                        signUpModal={this.signUpModal}
                    />
                    <Switch> {/* Optional; specify only one Route match; used when path names are too similar */}
                        {/* <Route path="/new-post" exact component={NewPost} />
                        <Route path="/posts" component={Posts} /> */}
                        <Route 
                            path="/:item" 
                            exact 
                            render = {(props) => <Series 
                                {...props} 
                                state={this.state}
                                handleChange={this.handleChange}
                                clicked={this.closeModal}
                                openModal={this.openModal}
                                loadItem={this.loadItem}
                                newItemModal={this.newItemModal}
                            />}
                        />
                        <Route 
                            path="/" 
                            exact 
                            render = {(props) => <Content 
                                {...props} 
                                state={this.state}
                                handleChange={this.handleChange}
                                clicked={this.closeModal}
                                updateContentModal={this.updateContentModal}
                                loadItem={this.loadItem}
                                newItemModal={this.newItemModal}
                            />}
                        />
                    </Switch>
                    {/* <Content 
                        state={this.state}
                        handleChange={this.handleChange}
                        clicked={this.closeModal}
                        newItemModal={this.newItemModal}
                    /> */}
                    <Modal 
                        state={this.state}
                        handleChange={this.handleChange}
                        clicked={this.closeModal}
                        signUp={this.signUp}
                        newItem={this.newItem}
                        updateContent={this.updateContent}
                    />
                </div>
            </BrowserRouter>

        )
    }
}

export default App;
