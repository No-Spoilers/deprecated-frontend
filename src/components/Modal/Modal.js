import React from 'react';

import SignUp from '../SignUp/SignUp'
import NewItem from '../NewItem/NewItem'
import UpdateContent from '../UpdateContent/UpdateContent'

import './Modal.css';

const modal = (props) => {
    if (!props.state.modal) {
        return null
    }
    
    let modalContent

    if (props.state.modal === 'MESSAGE') {
        modalContent = (
            <div className="modal-message">
                {props.state.modalMessage}
            </div>

        )
    } else if (props.state.modal === 'SIGN_UP') {
        modalContent = (
            <SignUp 
                state={props.state}
                handleChange={props.handleChange}
                signUp={props.signUp}
            />
        )
    } else if (props.state.modal === 'NEW_ITEM') {
        modalContent = (
            <NewItem 
                state={props.state}
                handleChange={props.handleChange}
                newItem={props.newItem}
            />
        )
    } else if (props.state.modal === 'UPDATE_CONTENT') {
        modalContent = (
            <UpdateContent 
                state={props.state}
                handleChange={props.handleChange}
                updateContent={props.updateContent}
            />
        )
    }
    
    return (
        <div>
            <div className='modal-backdrop' onClick={props.clicked}></div>
            <div className="modal-div">
                {modalContent}
            </div>
        </div>
    )
};

export default modal;
