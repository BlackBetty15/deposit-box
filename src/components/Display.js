import React, { Component } from 'react';
import { connect } from 'react-redux';

class Display extends Component {

    componentDidUpdate(prevProps) {
        if(this.props.validationRequest && prevProps.validationRequest !== this.props.validationRequest) {
            this.props.sendValidationParam(this.props.displayValue);
        }

        if(this.props.savedCode !== '' && prevProps.savedCode !== this.props.savedCode) {
                this.props.sendPassCode(this.props.savedCode);
        }

        if(this.props.APIRequest && prevProps.APIRequest !== this.props.APIRequest) {
            this.props.sendAPICode(this.props.displayValue);
        }
    }

    render(){
        if (this.props.displayValue === ''){
            return (
                <div className= {"display__wrapper " + this.props.backgroundStatus}>
                    <input className="display__input display__input--top text--regular" disabled={true} value={this.props.lockStatus} type="text"/>
                    <input className="display__input display__input--bottom text--large align--right" disabled={true} value={this.props.displayStatus} type="text"/>
                </div>
            );
        } else if (this.props.displayValue !== '' && this.props.displayStatus !== '') {
            return (
                <div className= {"display__wrapper " + this.props.backgroundStatus}>
                    <input className="display__input display__input--top text--regular" disabled={true} value={this.props.lockStatus} type="text"/>
                    <input className="display__input display__input--bottom text--large align--right" disabled={true} value={this.props.displayStatus} type="text"/>
                </div>
            );
        } else if (this.props.displayValue !== '') {
            return (
                <div className= {"display__wrapper " + this.props.backgroundStatus}>
                    <input className="display__input display__input--top text--regular" disabled={true} value={this.props.lockStatus} type="text"/>
                    <input className="display__input display__input--bottom text--large align--right" disabled={true} value={this.props.displayValue} type="text"/>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return  {
        backgroundStatus : state.displayReducer.backgroundStatus,
        lockStatus: state.displayReducer.lockStatus,
        displayStatus: state.displayReducer.displayStatus,
        displayValue: state.displayReducer.displayValue,
        savedCode: state.displayReducer.savedCode,
        error: state.displayReducer.error,
        unlockInit: state.displayReducer.unlockInit,
        validationRequest: state.displayReducer.validationRequest,
        APIRequest: state.displayReducer.APIRequest
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeDisplayBacklight: (status) => dispatch({type: "CHANGE_DISPLAY_BACKLIGHT", payload:status}),
        startBacklightTimer:() => dispatch({type: "START_TIMER", payload: { actionName: 'CHANGE_DISPLAY_BACKLIGHT', actionPayload: {}, timerName: 'backlightTimer',timerInterval: 5}}),
        stopBacklightTimer: () => dispatch({ type: "STOP_TIMER", payload: { timerName: 'backlightTimer'}}),
        sendPassCode: (payload) => dispatch({type: "SAVE_CODE", payload: payload}),
        sendValidationParam: (payload) => dispatch({type: "VALIDATION", payload: payload}),
        sendAPICode: (payload) => dispatch({type:"GET_API_CODE",payload: payload})
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Display)
