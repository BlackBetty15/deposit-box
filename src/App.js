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
    };
    validationRequestHandler = () => {
        this.props.changeDisplayStatus('Validating...');
        setTimeout(() => {
            this.props.validateInput();
        },500);
    };
    masterHandler = () => {};
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
        masterCode: state.validationReducer.masterCode
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
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(App)
