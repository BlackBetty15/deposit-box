import React, {Component} from 'react';
import Keyboard from './components/Keyboard';
import Display from './components/Display';
import connect from "react-redux/es/connect/connect";

class App extends Component {
    componentDidUpdate(prevProps, prevState) {
        if(this.props.initializeLock === true && this.props.initializeLock !== prevProps.initializeLock) {
            this.props.stopTimer();
            this.props.storePassCode();
            this.props.changeDisplayStatus('Locking...');
            setTimeout(() => {
                this.props.changeDisplayStatus('');
                this.props.changeLockStatus('Locked');
            },3000);
        }
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
        validationCode: state.validationReducer.validationCode,
        savedCode: state.validationReducer.savedCode,
        validationStatus: state.validationReducer.validationStatus,
        initializeLock: state.validationReducer.initializeLock,
        initializeCheck: state.validationReducer.initializeCheck,
        serial: state.validationReducer.serial,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeDisplayBacklight: (status) => dispatch({type: "CHANGE_DISPLAY_BACKLIGHT", payload:status}),
        changeLockStatus: (status) => dispatch({type: "CHANGE_LOCKED_STATUS",payload: status}),
        changeDisplayStatus: (status) => dispatch({type: "CHANGE_DISPLAY_STATUS",payload: status}),
        stopTimer: () => dispatch({ type: "STOP_TIMER", payload: { timerName: 'buttonTimer'}}),
        storePassCode: () => dispatch({type: "SAVE_PASSCODE"}),

    }
};

export default connect(mapStateToProps,mapDispatchToProps)(App)
