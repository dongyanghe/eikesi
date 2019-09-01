
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import helper from '../util/helper';
import CustomerRelation from '../../entities/customer-relation/customer-relation.reducer';
import { ICustomerRelation, defaultValue } from 'app/shared/model/customer-relation.model';
import settings from './settings';
// import members from './members';
import snackbar from 'app/shared/reducers/snackbar';
import { IRootState } from 'app/shared/reducers';
import { getSession, login } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale, setIsShowImWindows } from 'app/shared/reducers/locale';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

async function resolveMessage(message) {
    const auth = window.localStorage.getItem('auth');
    const isChatRoom = helper.isChatRoom(message.FromUserName);
    const content = (isChatRoom && !message.isme) ? message.Content.split(':<br/>')[1] : message.Content;

    console.warn('UserInfo AddFriend unrealized：');

    return message;
}

function hasUnreadMessage(messagesMap) {
    console.warn('UserInfo AddFriend unrealized：');
}

async function updateMenus({ conversations = [], customerRelation = [] }) {
    console.warn('UserInfo updateMenus unrealized：');
}
export const ACTION_TYPES = {
    TOGGLE: 'chat/TOGGLE_CONVERSATION',
    UPDATE_SELECTED_MESSAGE: 'chat/UPDATE_SELECTED_MESSAGE',
    LOAD_CHATS: 'chat/LOAD_CHATS',
    TO_PREV: 'chat/TO_PREV',
    SHOW_MESSAGE: 'chat/SHOW_MESSAGE',
    TO_NEXT: 'chat/TO_NEXT',
    TO_USER: 'chat/TO_USER',
    ADD_MESSAGE: 'chat/ADD_MESSAGE',
    SEND_TEXT_MESSAGE: 'chat/SEND_TEXT_MESSAGE',
    SEND_EMOJI_MESSAGE: 'chat/SEND_EMOJI_MESSAGE',
    SEND_IMAGE_MESSAGE: 'chat/SEND_IMAGE_MESSAGE',
    SEND_FILE_MESSAGE: 'chat/SEND_FILE_MESSAGE',
    SEND_VIDEO_MESSAGE: 'chat/SEND_VIDEO_MESSAGE',
    SEND_MESSAGE: 'chat/SEND_MESSAGE',
    PROCESS: 'chat/PROCESS',
    UPLOAD: 'chat/UPLOAD',
    ADD_UPLOAD_PREVIEW: 'chat/ADD_UPLOAD_PREVIEW',
    RECALL_MESSAGE: 'chat/RECALL_MESSAGE',
    MARKED_READ: 'chat/MARKED_READ',
    STICKY: 'chat/STICKY',
    REMOVE_CHAT: 'chat/REMOVE_CHAT',
    RESET: 'chat/RESET',
    EMPTY: 'chat/EMPTY'
};

const initialState: {
    user: boolean | any;    //  当前对话的成员
    selectedMessage: any;
    showConversation: Boolean;
    sessions: any[];
    messagesMap: Map<string, any>;
} = {
    user: false,
    selectedMessage: {},
    showConversation: true,
    sessions: [],
    messagesMap: new Map()
};
export type ChatState = Readonly<typeof initialState>;
export default (state: ChatState = initialState, action): ChatState => {
    switch (action.type) {
        case ACTION_TYPES.TOGGLE:

            return {
                ...state
            };
        case ACTION_TYPES.UPDATE_SELECTED_MESSAGE:

            return {
                ...state,
                selectedMessage: action.payload.selectedMessage
            };
        case ACTION_TYPES.LOAD_CHATS:

            return {
                ...state
            };
        case ACTION_TYPES.TO_PREV:

            return {
                ...state
            };
        case ACTION_TYPES.SHOW_MESSAGE:

            return {
                ...state
            };
        case ACTION_TYPES.TO_NEXT:

            return {
                ...state
            };
        case ACTION_TYPES.TO_USER:

            return {
                ...state
            };
        case ACTION_TYPES.ADD_MESSAGE:

            return {
                ...state
            };
        case ACTION_TYPES.SEND_TEXT_MESSAGE:

            return {
                ...state
            };
        case ACTION_TYPES.SEND_EMOJI_MESSAGE:

            return {
                ...state
            };
        case ACTION_TYPES.SEND_IMAGE_MESSAGE:

            return {
                ...state
            };
        case ACTION_TYPES.SEND_FILE_MESSAGE:

            return {
                ...state
            };
        case ACTION_TYPES.SEND_VIDEO_MESSAGE:

            return {
                ...state
            };
        case ACTION_TYPES.SEND_MESSAGE:

            return {
                ...state
            };
        case ACTION_TYPES.PROCESS:

            return {
                ...state
            };
        case ACTION_TYPES.UPLOAD:

            return {
                ...state
            };
        case ACTION_TYPES.ADD_UPLOAD_PREVIEW:

            return {
                ...state
            };
        case ACTION_TYPES.RECALL_MESSAGE:

            return {
                ...state
            };
        case ACTION_TYPES.MARKED_READ:

            return {
                ...state
            };
        case ACTION_TYPES.STICKY:

            return {
                ...state
            };
        case ACTION_TYPES.REMOVE_CHAT:

            return {
                ...state
            };
        case ACTION_TYPES.RESET:

            return {
                ...state,
                user: action.payload.user
            };
        case ACTION_TYPES.EMPTY:

            return {
                ...state,
                messagesMap: action.payload.messagesMap
            };
        default:
            return state;
    }
};
export const toggleConversation = (showConversation = !initialState.showConversation) => async dispatch => {
    dispatch({
        type: ACTION_TYPES.TOGGLE,
        action: { showConversation }
    });
};

export const loadChats = (chatSet: string, iCustomerRelationList: ICustomerRelation[], messagesMap: Map<string, any>, sessions: String) => async dispatch => {

    const list = iCustomerRelationList;
    const res = [];
    const temps = [];
    const sorted = [];

    if (!chatSet) return;

    helper.unique(chatSet.split(',')).map(e => {
        const user = list.find(iCustomerRelation => iCustomerRelation.remarkName === e && !helper.isChatRoom(e));

        if (user) {
            res.push(user);
        } else {
            // User not in your contact
            temps.push(e);
        }
    });

    if (temps.length) {
        // await customerRelation.batch(temps);

        temps.map(e => {
            const user = list.find(iCustomerRelation => iCustomerRelation.remarkName === e);

            // Remove all the invalid accounts, eg: Official account
            if (user) {
                res.push(user);
            }
        });
    }
    res.map((e, index) => {
        initialState.messagesMap.set(e.UserName, {
            data: [],
            unread: 0
        });

        // Save the original index to support sticky feature
        e.index = index;

        if (helper.isTop(e)) {
            sorted.unshift(e);
        } else {
            sorted.push(e);
        }
    });
    await dispatch({
        type: ACTION_TYPES.TOGGLE,
        action: { messagesMap }
    });
    return res;
};

export const chatToPrev = () => async dispatch => {
    console.warn('chat function unrealized：');
};

export const chatToNext = () => async dispatch => {
    console.warn('chat function unrealized：');
};

export const chatTo = (user, onTop?: boolean) => async dispatch => {
    console.warn('chat function unrealized：');
};

export const addMessage = (message: any, sync = false) => dispatch => {
    console.warn('chat function unrealized：', dispatch);
};

export const sendTextMessage = (auth: any, message: any, isForward) => dispatch => {
    console.warn('chat function unrealized：');
};

export const sendEmojiMessage = (auth: any, message) => dispatch => {
    console.warn('chat function unrealized：');
};

export const sendImageMessage = (auth: any, message: any, isForward) => dispatch => {
    console.warn('chat function unrealized：');
};
export const sendFileMessage = (auth: any, message: any, isForward) => dispatch => {
    console.warn('chat function unrealized：');
};

export const sendVideoMessage = (auth: any, message: any, isForward) => dispatch => {
    console.warn('chat function unrealized：');
};

const transformMessagesDefault = (to, messagesMap: Map<string, any>, message) => dispatch => {
    console.warn('chat function unrealized：');
};

export const sendMessage = (user, message: any, isForward = false, transformMessages = transformMessagesDefault) => dispatch => {
    console.warn('chat function unrealized：');
};

export const process = (file, user = initialState.user) => dispatch => {
    console.warn('chat function unrealized：');
};

export const upload = (file, user = initialState.user) => dispatch => {
    console.warn('chat function unrealized：');
};

export const addUploadPreview = (file, type, user = initialState.user) => dispatch => {
    console.warn('chat function unrealized：');
};

export const recallMessage = message => dispatch => {
    console.warn('chat function unrealized：');
};

export const deleteMessage = (userid, messageid) => dispatch => {
    console.warn('chat function unrealized：');
};

export const markedRead = userid => dispatch => {
    console.warn('chat function unrealized：');
};

export const sticky = user => async dispatch => {
    console.warn('chat function unrealized：');
};

export const removeChat = user => async dispatch => {
    console.warn('chat function unrealized：');
};

export const reset = () => async dispatch => {
    dispatch({
        type: ACTION_TYPES.RESET,
        payload: { user: false }
      });
};

export const empty = (user, messagesMap: Map<string, any>) => async dispatch => {
    // Empty the chat content
    messagesMap.set(user.UserName, {
        data: [],
        unread: 0
    });
    dispatch({
        type: ACTION_TYPES.EMPTY,
        action: { messagesMap }
    });
};
