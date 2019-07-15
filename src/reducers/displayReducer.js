import {PRESS_KEY, CHANGE_DISPLAY_BACKLIGHT, CHANGE_LOCKED_STATUS, CHANGE_DISPLAY_STATUS} from '../actions/actions';

const initialState = {
    backgroundStatus: 'display__wrapper--active',
    lockStatus: 'Unlocked',
    displayStatus: 'Ready',
    displayValue: '',
};

const displayReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PRESS_KEY':
            state = {
                ...state,
                displayStatus: action.payload.displayStatus,
                displayValue: this.state.displayValue += action.payload.displayValue
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
        default:
            break;
    }
    console.log(state); //Logging state to see changes
    return state;
};

export default displayReducer;