import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { changeLockedStatus, changeDisplayBacklight, changeDisplayStatus} from '../actions/actions';

class Display extends Component {


    componentDidMount() {
       setTimeout(this.changeBacklight,5000);
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
            return(
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
        backgroundStatus : state.backgroundStatus,
        lockStatus: state.lockStatus,
        displayStatus: state.displayStatus,
        displayValue: state.displayValue
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeDisplayBacklight: (status) => dispatch({type: "CHANGE_DISPLAY_BACKLIGHT", payload:status})
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Display)
