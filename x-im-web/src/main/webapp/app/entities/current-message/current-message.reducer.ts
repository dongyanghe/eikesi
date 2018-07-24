import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICurrentMessage, defaultValue } from 'app/shared/model/current-message.model';

export const ACTION_TYPES = {
  SEARCH_CURRENTMESSAGES: 'currentMessage/SEARCH_CURRENTMESSAGES',
  FETCH_CURRENTMESSAGE_LIST: 'currentMessage/FETCH_CURRENTMESSAGE_LIST',
  FETCH_CURRENTMESSAGE: 'currentMessage/FETCH_CURRENTMESSAGE',
  CREATE_CURRENTMESSAGE: 'currentMessage/CREATE_CURRENTMESSAGE',
  UPDATE_CURRENTMESSAGE: 'currentMessage/UPDATE_CURRENTMESSAGE',
  DELETE_CURRENTMESSAGE: 'currentMessage/DELETE_CURRENTMESSAGE',
  RESET: 'currentMessage/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICurrentMessage>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CurrentMessageState = Readonly<typeof initialState>;

// Reducer

export default (state: CurrentMessageState = initialState, action): CurrentMessageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CURRENTMESSAGES):
    case REQUEST(ACTION_TYPES.FETCH_CURRENTMESSAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CURRENTMESSAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CURRENTMESSAGE):
    case REQUEST(ACTION_TYPES.UPDATE_CURRENTMESSAGE):
    case REQUEST(ACTION_TYPES.DELETE_CURRENTMESSAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CURRENTMESSAGES):
    case FAILURE(ACTION_TYPES.FETCH_CURRENTMESSAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CURRENTMESSAGE):
    case FAILURE(ACTION_TYPES.CREATE_CURRENTMESSAGE):
    case FAILURE(ACTION_TYPES.UPDATE_CURRENTMESSAGE):
    case FAILURE(ACTION_TYPES.DELETE_CURRENTMESSAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CURRENTMESSAGES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CURRENTMESSAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CURRENTMESSAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CURRENTMESSAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_CURRENTMESSAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CURRENTMESSAGE):
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

const apiUrl = 'api/current-messages';
const apiSearchUrl = 'api/_search/current-messages';

// Actions

export const getSearchEntities: ICrudSearchAction<ICurrentMessage> = query => ({
  type: ACTION_TYPES.SEARCH_CURRENTMESSAGES,
  payload: axios.get<ICurrentMessage>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICurrentMessage> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CURRENTMESSAGE_LIST,
  payload: axios.get<ICurrentMessage>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICurrentMessage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CURRENTMESSAGE,
    payload: axios.get<ICurrentMessage>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICurrentMessage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CURRENTMESSAGE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICurrentMessage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CURRENTMESSAGE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICurrentMessage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CURRENTMESSAGE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
