
const initialStateValidation = {
    locked: false,
    validationCode: '',
    savedCode: '',
    validationStatus: '',
    initializeLock: false,
    initializeCheck: false,
    serial: '4815162342'
};

const validationReducer = (state = initialStateValidation, action) => {
    switch (action.type) {
        case "PROCESS_INPUT":
           let lockInit = false;
           let checkInit = false;
           if(state.savedCode === '' && state.locked === false) {
                lockInit = true;
                checkInit = false;
           } else {
               lockInit = false;
               checkInit = true;
           }

           state = {
                ...state,
                initializeCheck: checkInit,
                initializeLock: lockInit,
            };
           break;
        case "SAVE_PASSCODE":

            state = {
                ...state,
                savedCode: action.payload,
                locked: true
            };
            break;
        default:
            break;
    }
    return state;
};

export default validationReducer;

