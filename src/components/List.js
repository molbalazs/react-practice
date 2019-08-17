import React from 'react';

export default class List extends React.Component {
    render() {
        return <ul>
            {(this.props.data).map((item, i) => {        
                return (<li key={i} onClick={item.onClick} >{item.name}</li>) 
            })}
        </ul>
    }
}