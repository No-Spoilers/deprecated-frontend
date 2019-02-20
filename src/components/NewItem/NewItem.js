import React from 'react';

import './NewItem.css';

const newItem = (props) => {
    console.log('--> props', props);
    return (
        <form className="new-item-form">
            <h3>New Series:</h3>
            <p>
                <label htmlFor="inputTitle"><b>Series Name</b></label>
                <input 
                    type="text" 
                    placeholder="Enter Series Name" 
                    name="inputTitle" 
                    value={props.state.inputTitle}
                    onChange={props.handleChange('inputTitle')}
                />
            </p>
            <p>
            <label htmlFor="creatorName"><b>Creator Name</b></label>
                <input 
                    type="text" 
                    placeholder="Creator Name" 
                    name="creatorName" 
                    value={props.state.inputCreator}
                    onChange={props.handleChange('inputCreator')}
                />
            </p>
            {props.state.loading ? <p>LOADING</p> : <p><button onClick={props.newItem}>Create Series Entry</button></p>}
        </form>
    )
};

export default newItem;
