import helper from 'app/shared/util/helper';
import axios from 'axios';
import { translate } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { getSession } from 'app/shared/reducers/authentication';
export const ACTION_TYPES = {
    UPDATE_ACCOUNT: 'account/UPDATE_ACCOUNT',
    RESET: 'account/RESET',
    SAVE: 'settings/SAVE'
};
const initialState = {
    loading: false,
    errorMessage: null,
    updateSuccess: false,
    updateFailure: false,
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
        case REQUEST(ACTION_TYPES.UPDATE_ACCOUNT):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case FAILURE(ACTION_TYPES.UPDATE_ACCOUNT):
            return {
                ...state,
                loading: false,
                updateSuccess: false,
                updateFailure: true
            };
        case SUCCESS(ACTION_TYPES.UPDATE_ACCOUNT):
            return {
                ...state,
                loading: false,
                updateSuccess: true,
                updateFailure: false
            };
        case ACTION_TYPES.RESET:
            return {
                ...initialState
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
// Actions
const apiUrl = 'uaaserver/api/account';

export const saveAccountSettings = account => async dispatch => {
    await dispatch({
        type: ACTION_TYPES.UPDATE_ACCOUNT,
        payload: axios.post(apiUrl, account),
        meta: {
            successMessage: translate('settings.messages.success')
        }
    });
    dispatch(getSession());
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
