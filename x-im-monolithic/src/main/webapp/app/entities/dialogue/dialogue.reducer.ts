import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDialogue, defaultValue } from 'app/shared/model/dialogue.model';

export const ACTION_TYPES = {
  FETCH_DIALOGUE_LIST: 'dialogue/FETCH_DIALOGUE_LIST',
  FETCH_DIALOGUE: 'dialogue/FETCH_DIALOGUE',
  CREATE_DIALOGUE: 'dialogue/CREATE_DIALOGUE',
  UPDATE_DIALOGUE: 'dialogue/UPDATE_DIALOGUE',
  DELETE_DIALOGUE: 'dialogue/DELETE_DIALOGUE',
  RESET: 'dialogue/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDialogue>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DialogueState = Readonly<typeof initialState>;

// Reducer

export default (state: DialogueState = initialState, action): DialogueState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DIALOGUE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DIALOGUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DIALOGUE):
    case REQUEST(ACTION_TYPES.UPDATE_DIALOGUE):
    case REQUEST(ACTION_TYPES.DELETE_DIALOGUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DIALOGUE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DIALOGUE):
    case FAILURE(ACTION_TYPES.CREATE_DIALOGUE):
    case FAILURE(ACTION_TYPES.UPDATE_DIALOGUE):
    case FAILURE(ACTION_TYPES.DELETE_DIALOGUE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DIALOGUE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DIALOGUE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DIALOGUE):
    case SUCCESS(ACTION_TYPES.UPDATE_DIALOGUE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DIALOGUE):
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

const apiUrl = 'api/dialogues';

// Actions

export const getEntities: ICrudGetAllAction<IDialogue> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DIALOGUE_LIST,
  payload: axios.get<IDialogue>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDialogue> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DIALOGUE,
    payload: axios.get<IDialogue>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDialogue> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DIALOGUE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDialogue> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DIALOGUE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDialogue> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DIALOGUE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
