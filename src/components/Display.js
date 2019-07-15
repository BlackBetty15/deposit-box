import React, { Component } from 'react';
import { connect } from 'react-redux';

class Display extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         lockStatusList: {
    //             0: 'Locked',
    //             1: 'Unlocked'
    //         },
    //
    //         displayStatusList: {
    //             empty: '',
    //             error: 'Error',
    //             ready: 'Ready',
    //             lock: 'Locking...',
    //             unlock: 'Unlocking...',
    //             service: 'Service',
    //             validate: 'Validating...'
    //         },
    //
    //         backgroundStatus: '',
    //         lockStatus: '',
    //         displayStatus: ''
    //     }
    // }

    componentDidMount() {
         // this.setState({
         //     lockStatus: this.props.lockStatusList[1],
         //     displayStatus : this.props.displayStatusList.ready
         // })
        // store.dispatch("INIT");

    }

    render(){
        return (
            <div className= {"display__wrapper " + this.props.backgroundStatus}>
                <input className="display__input display__input--top text--regular" disabled={true} value={this.props.lockStatus} type="text"/>
                <input className="display__input display__input--bottom text--large align--right" disabled={true} value={this.props.displayStatus} type="text"/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        display: state.displayReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       Init: () => {
           dispatch({
               type: "INIT"
           })
       }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Display)