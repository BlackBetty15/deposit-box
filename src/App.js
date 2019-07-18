import React, {Component} from 'react';
import Keyboard from './components/Keyboard';
import Display from './components/Display';
import connect from "react-redux/es/connect/connect";

class App extends Component {

    componentDidUpdate(prevProps, prevState) {
        if(this.props.initializeLock === true && this.props.initializeLock !== prevProps.initializeLock) {
            this.lockHandler();
        } else if(this.props.initializeCheck === true && this.props.initializeCheck !== prevProps.initializeCheck) {
           this.validationRequestHandler();
        } else if(this.props.error === true && this.props.error !== prevProps.error) {
            this.errorHandler();
        } else if (this.props.locked && this.props.matching) {
            this.unlockHandler();
        } else if(this.props.initializeReLock === true && this.props.initializeReLock !== prevProps.initializeReLock) {
            this.validationRequestHandler();
        } else if (this.props.initializeReLock && this.props.matching) {
            this.relockHandler();
        } else if (this.props.masterCode && prevProps.masterCode !== this.props.masterCode) {
            this.serviceHandler();
        } else if (this.props.initializeAPI && this.props.serviceCode === '') {
            this.props.requestInput();
            console.log('pitaj api');
        } else if (this.props.initializeAPI && this.props.serviceCode !== '') {
            this.masterHandler();
        }
    };

    lockHandler = () => {
        this.props.storePassCode();
        this.props.changeDisplayStatus('Locking...');
        setTimeout(() => {
            this.props.changeDisplayStatus('');
            this.props.changeLockStatus('Locked');
            this.props.lockApp();
        },3000);
    };

    unlockHandler = () => {
        this.props.changeDisplayStatus('Unlocking...');
        setTimeout(() => {
            this.props.clearValue();
            this.props.changeDisplayStatus('Ready');
            this.props.changeLockStatus('Unlocked');
            this.props.unlockApp();
        },3000);
    };

    relockHandler = () => {
        this.props.changeDisplayStatus('Locking...');
        setTimeout(() => {
            this.props.changeDisplayStatus('');
            this.props.changeLockStatus('Locked');
            this.props.lockApp();
            this.props.clearValue();
        },3000);
    };

    errorHandler = () => {
        this.props.changeDisplayStatus('Error');
        this.props.clearValue();
        this.props.unsetRequests();
    };

    validationRequestHandler = () => {
        this.props.changeDisplayStatus('Validating...');
        setTimeout(() => {
            this.props.validateInput();
        },500);
    };

    serviceHandler = () => {
        this.props.changeDisplayStatus('Service');
        this.props.clearValue();
    };

    masterHandler = () => {
        this.props.clearValue();
        this.props.changeDisplayStatus('Validating...');
        fetch('https://9w4qucosgf.execute-api.eu-central-1.amazonaws.com/default/CR-JS_team_M02a?code='+this.props.serviceCode)
            .then(response => response.json())
            .then((data) => {
                console.log(data.sn);
                if(data.sn === this.props.serial) {
                    this.props.masterReset();
                } else {
                    this.props.changeDisplayStatus('');
                }
            });
    };
  render() {
    return (
      <div className="content">
        <Display/>
        <Keyboard />
        <p className="align--right text--small">S/N:{this.props.serial}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return  {
        locked: state.validationReducer.locked,
        initializeLock: state.validationReducer.initializeLock,
        initializeReLock: state.validationReducer.initializeReLock,
        initializeCheck: state.validationReducer.initializeCheck,
        lockCode: state.validationReducer.lockCode,
        serial: state.validationReducer.serial,
        error: state.validationReducer.error,
        matching: state.validationReducer.matching,
        masterCode: state.validationReducer.masterCode,
        initializeAPI: state.validationReducer.initializeAPI,
        serviceCode: state.validationReducer,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeDisplayBacklight: (status) => dispatch({type: "CHANGE_DISPLAY_BACKLIGHT", payload:status}),
        changeLockStatus: (status) => dispatch({type: "CHANGE_LOCKED_STATUS",payload: status}),
        changeDisplayStatus: (status) => dispatch({type: "CHANGE_DISPLAY_STATUS",payload: status}),
        stopTimer: () => dispatch({ type: "STOP_TIMER", payload: { timerName: 'buttonTimer'}}),
        storePassCode: () => dispatch({type: "SAVE_PASSCODE"}),
        validateInput: () => dispatch({type: "VALIDATE_INPUT"}),
        lockApp: () => dispatch({type: "LOCK"}),
        unlockApp: () => dispatch({type: "UNLOCK"}),
        clearValue: () => dispatch({type: "CLEAR"}),
        unsetRequests: () => dispatch({type: "UNSET_REQUEST"}),
        requestInput: () => dispatch({type: "GET_API_CODE"}),
        masterReset: () => dispatch({type: "MASTER_RESET"})
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(App)
