const displayReducer = ( state = {
    lockStatusList: {
        0: 'Locked',
        1: 'Unlocked'
    },

    displayStatusList: {
        empty: '',
        error: 'Error',
        ready: 'Ready',
        lock: 'Locking...',
        unlock: 'Unlocking...',
        service: 'Service',
        validate: 'Validating...'
    },

    backgroundStatus: '',
    lockStatus: ' ',
    displayStatus: ' '
}, action) => {

    switch (action.type) {
        case "INIT":
            state = {
                ...state,
                backgroundStatus: '',
                lockStatus: 'Unlocked',
                displayStatus: 'Ready'
            };
            break;
        default:
    }
    return state;
}
export default displayReducer;