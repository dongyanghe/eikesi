import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHistoryMessage, defaultValue } from 'app/shared/model/history-message.model';

export const ACTION_TYPES = {
  SEARCH_HISTORYMESSAGES: 'historyMessage/SEARCH_HISTORYMESSAGES',
  FETCH_HISTORYMESSAGE_LIST: 'historyMessage/FETCH_HISTORYMESSAGE_LIST',
  FETCH_HISTORYMESSAGE: 'historyMessage/FETCH_HISTORYMESSAGE',
  CREATE_HISTORYMESSAGE: 'historyMessage/CREATE_HISTORYMESSAGE',
  UPDATE_HISTORYMESSAGE: 'historyMessage/UPDATE_HISTORYMESSAGE',
  DELETE_HISTORYMESSAGE: 'historyMessage/DELETE_HISTORYMESSAGE',
  RESET: 'historyMessage/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHistoryMessage>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type HistoryMessageState = Readonly<typeof initialState>;

// Reducer

export default (state: HistoryMessageState = initialState, action): HistoryMessageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_HISTORYMESSAGES):
    case REQUEST(ACTION_TYPES.FETCH_HISTORYMESSAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HISTORYMESSAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HISTORYMESSAGE):
    case REQUEST(ACTION_TYPES.UPDATE_HISTORYMESSAGE):
    case REQUEST(ACTION_TYPES.DELETE_HISTORYMESSAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_HISTORYMESSAGES):
    case FAILURE(ACTION_TYPES.FETCH_HISTORYMESSAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HISTORYMESSAGE):
    case FAILURE(ACTION_TYPES.CREATE_HISTORYMESSAGE):
    case FAILURE(ACTION_TYPES.UPDATE_HISTORYMESSAGE):
    case FAILURE(ACTION_TYPES.DELETE_HISTORYMESSAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_HISTORYMESSAGES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HISTORYMESSAGE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HISTORYMESSAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HISTORYMESSAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_HISTORYMESSAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HISTORYMESSAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/history-messages';
const apiSearchUrl = 'api/_search/history-messages';

// Actions

export const getSearchEntities: ICrudSearchAction<IHistoryMessage> = query => ({
  type: ACTION_TYPES.SEARCH_HISTORYMESSAGES,
  payload: axios.get<IHistoryMessage>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IHistoryMessage> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_HISTORYMESSAGE_LIST,
    payload: axios.get<IHistoryMessage>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IHistoryMessage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HISTORYMESSAGE,
    payload: axios.get<IHistoryMessage>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHistoryMessage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HISTORYMESSAGE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHistoryMessage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HISTORYMESSAGE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHistoryMessage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HISTORYMESSAGE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
