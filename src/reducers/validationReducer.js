
const initialStateValidation = {
    locked: false,
    initializeLock: false,
    initializeReLock: false,
    initializeCheck: false,
    initializeAPI: false,
    lockCode: '',
    serial: '4815162342',
    matching: false,
    error: false,
    masterCode: false,
    serviceCode: ''
};

const validationReducer = (state = initialStateValidation, action) => {
    switch (action.type) {
        case "PROCESS_INPUT":
           let lockInit = false;
           let relockInit = false;
           let checkInit = false;
           let initAPI = false;

           if(!state.masterCode) {
               if (!state.locked && state.lockCode !== '') {
                   relockInit = true;

               } else if (state.locked === false){
                   lockInit = true;
               } else {
                   checkInit = true;
               }
           } else {
               initAPI = true;
           }

           state = {
                ...state,
                initializeCheck: checkInit,
                initializeLock: lockInit,
                initializeReLock: relockInit,
                initializeAPI: initAPI,
                error: false,
                matching: false
            };
           break;
        case "UNSET_REQUEST":
            state = {
                ...state,
                initializeLock: false,
                initializeCheck: false,
                initializeReLock: false
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
            };
        break;
        case "VALIDATION": {
            let matching;
            let error;
            let master;
            if(state.locked && state.lockCode !== '') {
                //Unlocking and master unlock matching
                if(state.lockCode === action.payload){
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
        case "GET_API_CODE":
            state = {
                ...state,
                serviceCode: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};

export default validationReducer;

