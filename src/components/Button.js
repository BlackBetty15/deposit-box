import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: this.props.content.symbol,
            value: this.props.content.value
        }

    }

    // handleClick = e => {
    //     e.target
    // }
    render(){
       if(this.state.symbol === 'A' || this.state.symbol === 'B') {
          return (
            <div className="keyboard__button">
                <p className="text--large align--center">{this.state.value}</p>
                <p className="keyboard__symbol align--right">{this.state.symbol}</p>
            </div>
          )
       } else if (this.state.symbol !== '') {
          return (
            <div className="keyboard__button">
                <p className="text--large align--center">{this.state.value}</p>
                <p className="keyboard__symbol align--right"><i className={"fas fa-long-arrow-alt-"+ this.state.symbol}></i></p>
            </div>
          )
       } else {
          return (
            <div className="keyboard__button">
                <p className="text--large align--center">{this.state.value}</p>
            </div>
          )
       }
    }
}

export default Button;