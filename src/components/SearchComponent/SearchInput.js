import React, { Component } from 'react'

const searchStyle = {
    maxWidth: '1000px',
    width: '65%',
    margin: '0 auto'
}

export default class SearchInput extends Component {
    render() {
        return  <div className="bp3-input-group bp3-large" style={searchStyle}>
            <span className="bp3-icon bp3-icon-search"></span>
            <input type="text" className="bp3-input" placeholder="Search" />
            <button className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right" ></button>
        </div >
    }
}
