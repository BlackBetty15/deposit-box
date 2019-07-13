import React, { Component } from 'react';

class Button extends Component {
    render(){
       if(this.props.content.symbol === 'A' || this.props.content.symbol === 'B') {
          return (
            <div className="keyboard__button">
                <p className="text--large align--center">{this.props.content.value}</p>
                <p className="keyboard__symbol align--right">{this.props.content.symbol}</p>
            </div>
          )
       } else if (this.props.content.symbol !== '') {
          return (
            <div className="keyboard__button">
                <p className="text--large align--center">{this.props.content.value}</p>
                <p className="keyboard__symbol align--right"><i className={"fas fa-long-arrow-alt-"+ this.props.content.symbol}></i></p>
            </div>
          )
       } else {
          return (
            <div className="keyboard__button">
                <p className="text--large align--center">{this.props.content.value}</p>
            </div>
          )
       }
    }
}

export default Button;