
const initialStateDisplay = {
    backgroundStatus: 'display__wrapper--active',
    lockStatus: 'Unlocked',
    displayStatus: 'Ready',
    displayValue: '',
    savedCode: '',
};

const displayReducer = (state = initialStateDisplay, action) => {
    switch (action.type) {
        case 'PRESS_KEY':
            state = {
                ...state,
                displayStatus: action.payload.displayStatus,
                displayValue: state.displayValue += action.payload.displayValue
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
        case 'CLEAR_VALUE':
            state = {
                ...state,
                savedCode: state.displayValue,
                displayValue: ''
            };
            break;
        default:
            break;
    }
    return state;
};

export default displayReducer;