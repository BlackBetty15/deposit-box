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

    handleClick = e => {
        this.props.pressKey({displayStatus: '', displayValue: this.state.value});
        this.props.stopTimer();
        this.props.startTimer();
        this.props.stopBacklightTimer();
        this.props.changeDisplayBacklight('display__wrapper--active');
        this.props.startBacklightTimer('');
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
        startTimer:() => dispatch({type: "START_TIMER", payload: { actionName: 'PROCESS_INPUT', timerName: 'buttonTimer',timerInterval: 1200, timerPeriod: 1}}),
        stopTimer: () => dispatch({ type: "STOP_TIMER", payload: { timerName: 'buttonTimer'}}),
        startBacklightTimer:(status) => dispatch({type: "START_TIMER", payload:{ actionName: 'CHANGE_DISPLAY_BACKLIGHT', timerName: 'backlightTimer', actionPayload: status, timerInterval: 5000, timerPeriod: 1}}),
        stopBacklightTimer: () => dispatch({ type: "STOP_TIMER", payload: { timerName: 'backlightTimer'}}),
        changeDisplayBacklight: (status) => dispatch({type: "CHANGE_DISPLAY_BACKLIGHT", payload:status})

    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Button);