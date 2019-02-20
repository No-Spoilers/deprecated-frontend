import React from 'react';

import './UpdateContent.css';

const updateContent = (props) => {
    console.log('--> props', props);
    return (
        <form className="update-content-form">
            <h3>Update Content for: {props.state.currentSlug}</h3>
            <p>
                <label htmlFor="newContent"><b>New Content</b></label>
            </p>
            <textarea 
                name="newContent" 
                placeholder="New Content" 
                value={props.state.activeText}
                onChange={props.handleChange('activeText')}
            />

            {props.state.loading ? <p>LOADING</p> : <p><button onClick={props.updateContent}>Update Content</button></p>}
        </form>
    )
};

export default updateContent;
