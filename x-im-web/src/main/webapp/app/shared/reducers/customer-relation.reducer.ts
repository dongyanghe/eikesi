import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustomerRelation, defaultValue } from 'app/shared/model/customer-relation.model';

export const ACTION_TYPES = {
  SEARCH_CUSTOMERRELATIONS: 'customerRelation/SEARCH_CUSTOMERRELATIONS',
  FETCH_CUSTOMERRELATION_LIST: 'customerRelation/FETCH_CUSTOMERRELATION_LIST',
  FETCH_CUSTOMERRELATION: 'customerRelation/FETCH_CUSTOMERRELATION',
  CREATE_CUSTOMERRELATION: 'customerRelation/CREATE_CUSTOMERRELATION',
  UPDATE_CUSTOMERRELATION: 'customerRelation/UPDATE_CUSTOMERRELATION',
  DELETE_CUSTOMERRELATION: 'customerRelation/DELETE_CUSTOMERRELATION',
  RESET: 'customerRelation/RESET',
  RESET__SEARCH_CUSTOMERRELATION: 'customerRelation/RESET__SEARCH_CUSTOMERRELATION'
};

const initialState = {
  loading: false,
  errorMessage: null,
  serchEntitieList: [] as ReadonlyArray<ICustomerRelation>,
  entities: [] as ReadonlyArray<ICustomerRelation>,
  entity: defaultValue, //  用户详情
  updating: false,
  updateSuccess: false
};

export type CustomerRelationState = Readonly<typeof initialState>;

// Reducer

export default (state: CustomerRelationState = initialState, action): CustomerRelationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CUSTOMERRELATIONS):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERRELATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERRELATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CUSTOMERRELATION):
    case REQUEST(ACTION_TYPES.UPDATE_CUSTOMERRELATION):
    case REQUEST(ACTION_TYPES.DELETE_CUSTOMERRELATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CUSTOMERRELATIONS):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERRELATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERRELATION):
    case FAILURE(ACTION_TYPES.CREATE_CUSTOMERRELATION):
    case FAILURE(ACTION_TYPES.UPDATE_CUSTOMERRELATION):
    case FAILURE(ACTION_TYPES.DELETE_CUSTOMERRELATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CUSTOMERRELATIONS):
      return {
        ...state,
        loading: false,
        serchEntitieList: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERRELATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERRELATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUSTOMERRELATION):
    case SUCCESS(ACTION_TYPES.UPDATE_CUSTOMERRELATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CUSTOMERRELATION):
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
    case ACTION_TYPES.RESET__SEARCH_CUSTOMERRELATION:
      return {
        ...initialState,
        serchEntitieList: initialState.serchEntitieList
      };
    default:
      return state;
  }
};

const apiUrl = 'api/customer-relations';
const apiSearchUrl = 'api/_search/customer-relations';

// Actions

export const getSearchEntities: ICrudSearchAction<ICustomerRelation> = query => ({
  type: ACTION_TYPES.SEARCH_CUSTOMERRELATIONS,
  payload: axios.get<ICustomerRelation>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICustomerRelation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CUSTOMERRELATION_LIST,
  payload: axios.get<ICustomerRelation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICustomerRelation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMERRELATION,
    payload: axios.get<ICustomerRelation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICustomerRelation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CUSTOMERRELATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICustomerRelation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CUSTOMERRELATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};
export const deleteEntity: ICrudDeleteAction<ICustomerRelation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CUSTOMERRELATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};
export const resetSerchEntitieList = () => ({
  type: ACTION_TYPES.RESET__SEARCH_CUSTOMERRELATION
});
export const reset = () => ({
  type: ACTION_TYPES.RESET
});
