import React from 'react';
import { NavLink } from 'react-router-dom';

import './Content.css';

const content = (props) => {
    let myRecentActivity = null
    // add search for user's recent edits and views

    let recentUpdates = null
    if (props.state.recentUpdates) {
        recentUpdates = props.state.recentUpdates.map(item => {
            return (
                <div key={item._id}>
                    {item.updatedAt}: 
                    <NavLink to={`/${item.slug}`}>
                        {item.title}
                    </NavLink>
                    by {item.creator}
                </div>
            );
        });
    }
    return (
        <div className="content-main">
            {props.state.token ? <button onClick={props.newItemModal}>Add New Series</button> : null}
            {myRecentActivity ? myRecentActivity : null}
            <div className="recent-changes-container">
                <div className="recent-changes-title">Recent activity:</div>
                {recentUpdates ? recentUpdates : <span>Loading...</span>}
            </div>
        </div>
    )
};

export default content;
