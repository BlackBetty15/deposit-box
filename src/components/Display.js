import React, { Component } from 'react';

class Display extends Component {
    state = {
        lockStatus: {
            0: 'Locked',
            1: 'Unlocked'
        },

        displayStatus: {
            empty: '',
            error: 'Error',
            ready: 'Ready',
            lock: 'Locking...',
            unlock: 'Unlocking...',
            service: 'Service',
            validate: 'Validating...'
        }
    };
    render(){
        return (
            <div className="display__wrapper">
                <input className="display__input display__input--top text--regular" disabled={true} value={this.state.lockStatus["1"]} type="text"/>
                <input className="display__input display__input--bottom text--large align--right" disabled={true} value={this.state.displayStatus.ready} type="text"/>
            </div>
        );
    }
}

export default Display;