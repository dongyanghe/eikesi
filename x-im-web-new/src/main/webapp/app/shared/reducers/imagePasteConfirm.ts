import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICustomerRelation, defaultValue } from 'app/shared/model/customer-relation.model';

export const ACTION_TYPES = {
    IMAGE_PASTE_CONFIRM_TOOGLE: 'imagePasteConfirm/IMAGE_PASTE_CONFIRM_TOOGLE'
};
const initialState = {
    isImagePasteConfirmShow: false,
    image: null
};
export type ImagePasteConfirmState = Readonly<typeof initialState>;
/**
 * 图片发送确认弹窗reducers
 */
export default (state: ImagePasteConfirmState = initialState, action): ImagePasteConfirmState => {
    switch (action.type) {
        case ACTION_TYPES.IMAGE_PASTE_CONFIRM_TOOGLE:
            return {
                isImagePasteConfirmShow: action.payload.isImagePasteConfirmShow,
                image: action.payload.image
            };
        default:
            return state;
    }
};
export let ok;
export let cancel;
export const toggle = (isImagePasteConfirmShow = initialState.isImagePasteConfirmShow, image = initialState.image) => dispatch => {
    const promise = new Promise((resolve, reject) => {
        ok = () => resolve(true);
        cancel = () => resolve(false);
    });
    dispatch({
        type: ACTION_TYPES.IMAGE_PASTE_CONFIRM_TOOGLE,
        payload: { isImagePasteConfirmShow, image }
    });

    return promise;
};
