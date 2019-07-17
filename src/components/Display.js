import React, { Component } from 'react';
import { connect } from 'react-redux';

class Display extends Component {


    // componentDidMount() {
    //    setTimeout(this.changeBacklight,5000);
    // }

    componentDidUpdate() {
        this.props.stopBacklightTimer();
        this.props.startBacklightTimer();
    }

    changeBacklight = () => {
       this.props.changeDisplayBacklight('');
    };

    render(){
        if (this.props.displayValue === ''){
            return (
                <div className= {"display__wrapper " + this.props.backgroundStatus}>
                    <input className="display__input display__input--top text--regular" disabled={true} value={this.props.lockStatus} type="text"/>
                    <input className="display__input display__input--bottom text--large align--right" disabled={true} value={this.props.displayStatus} type="text"/>
                </div>
            );
        } else if (this.props.displayValue !== '' && this.props.displayStatus !== 'Locking...') {
            return (
                <div className= {"display__wrapper " + this.props.backgroundStatus}>
                    <input className="display__input display__input--top text--regular" disabled={true} value={this.props.lockStatus} type="text"/>
                    <input className="display__input display__input--bottom text--large align--right" disabled={true} value={this.props.displayValue    } type="text"/>
                </div>
            )
        } else if (this.props.displayValue !== '' && this.props.displayStatus === 'Locking...') {
            return (
                <div className= {"display__wrapper " + this.props.backgroundStatus}>
                    <input className="display__input display__input--top text--regular" disabled={true} value={this.props.lockStatus} type="text"/>
                    <input className="display__input display__input--bottom text--large align--right" disabled={true} value={this.props.displayStatus} type="text"/>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return  {
        backgroundStatus : state.displayReducer.backgroundStatus,
        lockStatus: state.displayReducer.lockStatus,
        displayStatus: state.displayReducer.displayStatus,
        displayValue: state.displayReducer.displayValue,
        savedCode: state.displayReducer.savedCode
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeDisplayBacklight: (status) => dispatch({type: "CHANGE_DISPLAY_BACKLIGHT", payload:status}),
        storePassCode: (code) => dispatch({type: "SAVE_PASSCODE"}),
        startBacklightTimer:() => dispatch({type: "START_TIMER", payload: { actionName: 'CHANGE_DISPLAY_BACKLIGHT', actionPayload: {}, timerName: 'backlightTimer',timerPeriod: 5}}),
        stopBacklightTimer: () => dispatch({ type: "STOP_TIMER", payload: { timerName: 'backlightTimer'}}),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Display)
