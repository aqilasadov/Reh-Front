import {APP_SET_MODULE_TITLE} from "../constants/AppActionTypes";

export function setModuleTitle(moduleTitle) {
    return {
        type: APP_SET_MODULE_TITLE,
        moduleTitle: moduleTitle,
    }
}