import React, { Component } from 'react';
import { connect } from 'react-redux';

class Display extends Component {


    componentDidMount() {
       setTimeout(this.changeBacklight,5000);
    }

    componentDidUpdate() {
        if(this.props.lockStatus === 'Locked' && this.props.displayValue !== '' && this.props.savedCode !== '') {
          this.props.storePassCode(this.props.savedCode);
        }
    }

    changeBacklight = () => {
       this.props.changeDisplayBacklight('');
    };

    render(){
        if (this.props.displayValue === '' && this.props.displayStatus !==''){
            return (
                <div className= {"display__wrapper " + this.props.backgroundStatus}>
                    <input className="display__input display__input--top text--regular" disabled={true} value={this.props.lockStatus} type="text"/>
                    <input className="display__input display__input--bottom text--large align--right" disabled={true} value={this.props.displayStatus} type="text"/>
                </div>
            );
        } else if (this.props.displayValue !== '' && this.props.displayStatus === ''){
            return (
                <div className= {"display__wrapper " + this.props.backgroundStatus}>
                    <input className="display__input display__input--top text--regular" disabled={true} value={this.props.lockStatus} type="text"/>
                    <input className="display__input display__input--bottom text--large align--right" disabled={true} value={this.props.displayValue    } type="text"/>
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
        savedCode: state.displayReducer.savedCode
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeDisplayBacklight: (status) => dispatch({type: "CHANGE_DISPLAY_BACKLIGHT", payload:status}),
        storePassCode: (code) => dispatch({type: "SAVE_PASSCODE",payload: code}),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Display)
