export const PRESS_KEY = "PRESS_KEY";
export const CHANGE_LOCKED_STATUS = "CHANGE_LOCKED_STATUS";
export const CHANGE_DISPLAY_STATUS = "CHANGE_DISPLAY_STATUS";
export const CHANGE_DISPLAY_BACKLIGHT = "CHANGE_DISPLAY_BACKLIGHT";

export function pressKey(key) {
    return {
        type: PRESS_KEY,
        payload: key
    }
}

export function changeLockedStatus(status) {
    return {
        type: CHANGE_LOCKED_STATUS,
        payload: status
    }
}

export function changeDisplayStatus(status) {
    return {
        type: CHANGE_DISPLAY_STATUS,
        payload: status
    }
}

export function changeDisplayBacklight(status) {
    return {
        type: CHANGE_DISPLAY_BACKLIGHT,
        payload: status
    }
}