
const initialStateValidation = {
    locked: false,
    initializeLock: false,
    initializeReLock: false,
    initializeCheck: false,
    lockCode: '',
    serial: '4815162342',
    matching: false,
    error: false,
    masterCode: false,
};

const validationReducer = (state = initialStateValidation, action) => {
    switch (action.type) {
        case "PROCESS_INPUT":
           let lockInit = false;
           let relockInit = false;
           let checkInit = false;

           if (!state.locked && state.lockCode !== '') {
               lockInit = false;
               checkInit = false;
               relockInit = true;

           } else if (state.locked === false){
               lockInit = true;
               checkInit = false;
               relockInit = false;
           } else {
               lockInit = false;
               checkInit = true;
               relockInit = false;
           }

           state = {
                ...state,
                initializeCheck: checkInit,
                initializeLock: lockInit,
                initializeReLock: relockInit,
                error: false,
                matching: false
            };
           break;
        case "LOCK":
            state = {
                ...state,
                locked: true,
                error: false,
                matching: false,
            };
            break;
         case "UNLOCK":
            state = {
                ...state,
                locked: false,
                error: false,
                matching: false,
                masterCode: false
            };
            break;
        case "SAVE_CODE" :
            state = {
                ...state,
                lockCode: action.payload
            }
        break;
        case "VALIDATION": {
            let matching;
            let error;
            let master;
            console.log('Validation started!');
            if(state.locked && state.lockCode !== '') {
                //Unlocking and master unlock matching
                console.log(state.lockCode);
                if(state.lockCode === action.payload){
                    console.log('matching!');
                    error = false;
                    master = false;
                    matching = true;
                } else if (action.payload === '000000') {
                    error = false;
                    master = true;
                    matching = false;
                } else {
                    error = true;
                    master = false;
                    matching = false;
                }
            } else if (!state.locked && state.lockCode !== '') {
                //Re-lock
                if(state.lockCode === action.payload){
                    error = false;
                    master = false;
                    matching = true;
                } else {
                    error = true;
                    master = false;
                    matching = false;
                }
            }

            state = {
                ...state,
                error: error,
                masterCode: master,
                matching: matching
            }
        };
        break;
        default:
            break;
    }
    return state;
};

export default validationReducer;

