
const initialStateDisplay = {
    backgroundStatus: '',
    lockStatus: 'Unlocked',
    displayStatus: 'Ready',
    displayValue: '',
    savedCode: '',
};

const displayReducer = (state = initialStateDisplay, action) => {
    switch (action.type) {
        case 'PRESS_KEY':
            let status;
            let value;
            if(state.displayStatus !== 'Locking...') {
                status = action.payload.displayStatus;
                value = action.payload.displayValue;
            } else {
                status = state.displayStatus;
                value = '';
            }

            state = {
                ...state,
                displayStatus: status,
                displayValue: state.displayValue += value
            };
            break;
        case 'CHANGE_DISPLAY_BACKLIGHT':
            state = {
                ...state,
                backgroundStatus: action.payload
            };
            break;
        case 'CHANGE_LOCKED_STATUS':
            state = {
                ...state,
                lockStatus: action.payload
            };
            break;
        case 'CHANGE_DISPLAY_STATUS':
            state = {
                ...state,
                displayStatus: action.payload
            };
            break;
        case 'SAVE_PASSCODE':
            state = {
                ...state,
                savedCode: state.displayValue,
                displayValue: ''
            };
            break;
        default:
            break;
    }
    console.log(state);
    return state;
};

export default displayReducer;