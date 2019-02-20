import React from 'react';

import './Series.css';

const content = (props) => {
    const series = props.match.params.item
    const itemRecord = props.state.itemStore[series]
    console.log('--> itemRecord :', itemRecord);

    if (!itemRecord || itemRecord.loading) {
        props.loadItem(series)
        return <div className='loading-series'>Loading series data...</div>
    } 
    
    const seriesData = itemRecord.data

    let content = 'No content yet'
    if (seriesData && seriesData.content.length > 0) {
        console.log('--> seriesData.content :', seriesData.content);
        content = seriesData.content[seriesData.content.length - 1].text
    }

    let installments = ['No installments yet']
    if (seriesData.children.length > 0) {
        installments = seriesData.children.map(installment => (
            <p>{installment}</p>
        ))
    }



    return (
        <div className="series-main">
            {props.state.token ? <button onClick={() => props.openModal('UPDATE_CONTENT', props.match.params.item, content)}>Update Content</button> : null}
            <div className="series-title">Series Title: {seriesData.title}</div>
            <div className="series-creator">Creator: {seriesData.creator}</div>
            <div className="series-content">Item content: {content}</div>
            <div className="series-installments">Installments: {installments}</div>


        </div>
    )
};

export default content;
