import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustomerFlock, defaultValue } from 'app/shared/model/customer-flock.model';

export const ACTION_TYPES = {
  SEARCH_CUSTOMERFLOCKS: 'customerFlock/SEARCH_CUSTOMERFLOCKS',
  FETCH_CUSTOMERFLOCK_LIST: 'customerFlock/FETCH_CUSTOMERFLOCK_LIST',
  FETCH_CUSTOMERFLOCK: 'customerFlock/FETCH_CUSTOMERFLOCK',
  CREATE_CUSTOMERFLOCK: 'customerFlock/CREATE_CUSTOMERFLOCK',
  UPDATE_CUSTOMERFLOCK: 'customerFlock/UPDATE_CUSTOMERFLOCK',
  DELETE_CUSTOMERFLOCK: 'customerFlock/DELETE_CUSTOMERFLOCK',
  RESET: 'customerFlock/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICustomerFlock>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CustomerFlockState = Readonly<typeof initialState>;

// Reducer

export default (state: CustomerFlockState = initialState, action): CustomerFlockState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CUSTOMERFLOCKS):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERFLOCK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERFLOCK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CUSTOMERFLOCK):
    case REQUEST(ACTION_TYPES.UPDATE_CUSTOMERFLOCK):
    case REQUEST(ACTION_TYPES.DELETE_CUSTOMERFLOCK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CUSTOMERFLOCKS):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERFLOCK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERFLOCK):
    case FAILURE(ACTION_TYPES.CREATE_CUSTOMERFLOCK):
    case FAILURE(ACTION_TYPES.UPDATE_CUSTOMERFLOCK):
    case FAILURE(ACTION_TYPES.DELETE_CUSTOMERFLOCK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CUSTOMERFLOCKS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERFLOCK_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERFLOCK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUSTOMERFLOCK):
    case SUCCESS(ACTION_TYPES.UPDATE_CUSTOMERFLOCK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CUSTOMERFLOCK):
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

const apiUrl = 'api/customer-flocks';
const apiSearchUrl = 'api/_search/customer-flocks';

// Actions

export const getSearchEntities: ICrudSearchAction<ICustomerFlock> = query => ({
  type: ACTION_TYPES.SEARCH_CUSTOMERFLOCKS,
  payload: axios.get<ICustomerFlock>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICustomerFlock> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMERFLOCK_LIST,
    payload: axios.get<ICustomerFlock>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICustomerFlock> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMERFLOCK,
    payload: axios.get<ICustomerFlock>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICustomerFlock> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CUSTOMERFLOCK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICustomerFlock> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CUSTOMERFLOCK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICustomerFlock> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CUSTOMERFLOCK,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
