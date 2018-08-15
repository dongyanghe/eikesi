import { TranslatorContext, Storage } from 'react-jhipster';

export const ACTION_TYPES = {
    TOGGLE: 'snackbar/TOGGLE',
    SHOW_MESSAGE: 'snackbar/SHOW_MESSAGE'
};

const initialState = {
    isShow: false,
    message: '' //  是否显示im窗口
};
export type SnackbarState = Readonly<typeof initialState>;
export default (state: SnackbarState = initialState, action): SnackbarState => {
    switch (action.type) {
        case ACTION_TYPES.TOGGLE: case ACTION_TYPES.SHOW_MESSAGE:
            const isShow = action.isShow;
            const message = action.message;
            return {
                isShow,
                message
            };
        default:
            return state;
    }
};

let timer = null;
export const toggle = state => async dispatch => {
    const isShow = state.isShow;
    const message = state.message;
    if (isShow) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            dispatch({
                type: ACTION_TYPES.TOGGLE,
                action: { isShow: false }
            });
        }, 3000);
    } else {
        clearTimeout(timer);
    }
};

export const showMessage = message => async dispatch => {
    dispatch({
        type: ACTION_TYPES.TOGGLE,
        action: { shoisShoww: true, message }
    });
};
