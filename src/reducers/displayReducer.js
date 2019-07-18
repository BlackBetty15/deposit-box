
const initialStateDisplay = {
    backgroundStatus: '',
    error: false,
    lockStatus: 'Unlocked',
    displayStatus: 'Ready',
    displayValue: '',
    savedCode: '',
    validationRequest: false,
    APIRequest: false,
};

const displayReducer = (state = initialStateDisplay, action) => {
    switch (action.type) {
        case "PRESS_KEY":
            let status;
            let value;

            if(state.displayStatus !== 'Locking...' && state.displayStatus !== 'Validating...' && state.displayStatus !== 'Unlocking...') {
                status = action.payload.displayStatus;
                value = action.payload.displayValue;
            } else {
                status = state.displayStatus;
                value = '';
            }

            state = {
                ...state,
                displayStatus: status,
                displayValue: state.displayValue += value,
                initUnlock: false
            };
            break;
        case "CHANGE_DISPLAY_BACKLIGHT":
            state = {
                ...state,
                backgroundStatus: action.payload
            };
            break;
        case "CHANGE_LOCKED_STATUS":
            state = {
                ...state,
                lockStatus: action.payload
            };
            break;
        case "CHANGE_DISPLAY_STATUS":
            state = {
                ...state,
                displayStatus: action.payload,
            };
            break;
        case "SAVE_PASSCODE":
            state = {
                ...state,
                savedCode: state.displayValue,
                displayValue: '',
            };
            break;
        case "VALIDATE_INPUT":
            state = {
                ...state,
                validationRequest: true,
                backgroundStatus: 'Validating...'
            };
            break;
        case "CLEAR":
            state = {
                ...state,
                displayValue: '',
                validationRequest: false,
                savedCode: '',
                APIRequest: false
            };
            break;
        case "REQUEST_API":
            state = {
                ...state,
                APIRequest: true
            };
            break;
        case "MASTER_RESET":
        default:
            break;
    }
    return state;
};

export default displayReducer;