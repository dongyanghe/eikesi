import helper from 'app/shared/util/helper';
import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustomerRelation, defaultValue } from 'app/shared/model/customer-relation.model';

export const ACTION_TYPES = {
    SAVE: 'settings/SAVE'
};
const initialState = {
    alwaysOnTop: false,
    showOnTray: false,
    showNotification: true,
    confirmImagePaste: true,
    startup: false,
    blockRecall: false,
    remeberConversation: false,
    showRedIcon: true,
    downloads: ''
};
export type SettingsState = Readonly<typeof initialState>;
export default (state: SettingsState = initialState, action): SettingsState => {
    switch (action.type) {
        case ACTION_TYPES.SAVE:
            //  localStorage的值与state必须保持一致所以写在这里
            window.localStorage.setItem('settings', JSON.stringify({
                ...state,
                ...action.payload
                }));
            return {
            ...state,
            ...action.payload
            };
        default:
          return state;
      }
};

export const save = (settingsState: {}) => dispatch => {
    dispatch({
        type: ACTION_TYPES.SAVE,
        payload: { settingsState }
      });
    //  @wait: 应用新配置
    // ipcRenderer.send('settings-apply', {
    //     settings: {
    //         alwaysOnTop,
    //         showOnTray,
    //         showNotification,
    //         confirmImagePaste,
    //         startup,
    //         downloads,
    //         blockRecall,
    //         remeberConversation,
    //         showRedIcon,
    //     }
    // });
};
export const init = () => dispatch => {
    const settingsStr = window.localStorage.getItem('settings') || '{}';
    const settings = JSON.parse(settingsStr);
    let newState: any = {};
    if (settings && Object.keys(settings).length) {
        // Use !! force convert to a bool value
        newState = {
            alwaysOnTop: !!settings.alwaysOnTop,
            showOnTray: !!settings.showOnTray,
            showNotification: !!settings.showNotification,
            confirmImagePaste: !!settings.confirmImagePaste,
            startup: !!settings.startup,
            blockRecall: !!settings.blockRecall,
            remeberConversation: !!settings.remeberConversation,
            showRedIcon: !!settings.showRedIcon,
            downloads: settings.downloads
        };
    }
    // Alway show the tray icon on windows
    if (!helper.isOsx) {
        newState.showOnTray = true;
    }

    if (!newState.downloads
        || typeof newState.downloads !== 'string') {
            newState.downloads = window.location.assign;
    }
    save(newState);
    return settings;
};
