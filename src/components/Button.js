import React, { Component } from 'react';
import { connect } from 'react-redux';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: this.props.content.symbol,
            value: this.props.content.value,
        }

    }

    // componentDidUpdate() {
    //     // this.props.stopTimer();
    // }

    handleClick = e => {
        this.props.pressKey({displayStatus: '', displayValue: this.state.value});
        this.props.stopTimer();
        this.props.startTimer();
    };

    render(){
       if(this.state.symbol === 'A' || this.state.symbol === 'B') {
          return (
            <div className="keyboard__button" onClick={this.handleClick}>
                <p className="text--large align--center">{this.state.value}</p>
                <p className="keyboard__symbol align--right">{this.state.symbol}</p>
            </div>
          )
       } else if (this.state.symbol !== '') {
          return (
            <div className="keyboard__button" onClick={this.handleClick}>
                <p className="text--large align--center">{this.state.value}</p>
                <p className="keyboard__symbol align--right"><i className={"fas fa-long-arrow-alt-"+ this.state.symbol}></i></p>
            </div>
          )
       } else {
          return (
            <div className="keyboard__button" onClick={this.handleClick}>
                <p className="text--large align--center">{this.state.value}</p>
            </div>
          )
       }
    }
}
const mapStateToProps = (state) => state;

const mapDispatchToProps = dispatch => {
    return {
        pressKey: (payload) => dispatch({type: "PRESS_KEY", payload:payload}),
        startTimer:() => dispatch({type: "START_TIMER", payload: { actionName: 'PROCESS_INPUT', timerName: 'buttonTimer'}}),
        stopTimer: () => dispatch({ type: "STOP_TIMER", payload: { timerName: 'buttonTimer'}})

    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Button);