import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFlockRelation, defaultValue } from 'app/shared/model/flock-relation.model';

export const ACTION_TYPES = {
  SEARCH_FLOCKRELATIONS: 'flockRelation/SEARCH_FLOCKRELATIONS',
  FETCH_FLOCKRELATION_LIST: 'flockRelation/FETCH_FLOCKRELATION_LIST',
  FETCH_FLOCKRELATION: 'flockRelation/FETCH_FLOCKRELATION',
  CREATE_FLOCKRELATION: 'flockRelation/CREATE_FLOCKRELATION',
  UPDATE_FLOCKRELATION: 'flockRelation/UPDATE_FLOCKRELATION',
  DELETE_FLOCKRELATION: 'flockRelation/DELETE_FLOCKRELATION',
  RESET: 'flockRelation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFlockRelation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FlockRelationState = Readonly<typeof initialState>;

// Reducer

export default (state: FlockRelationState = initialState, action): FlockRelationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_FLOCKRELATIONS):
    case REQUEST(ACTION_TYPES.FETCH_FLOCKRELATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FLOCKRELATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FLOCKRELATION):
    case REQUEST(ACTION_TYPES.UPDATE_FLOCKRELATION):
    case REQUEST(ACTION_TYPES.DELETE_FLOCKRELATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_FLOCKRELATIONS):
    case FAILURE(ACTION_TYPES.FETCH_FLOCKRELATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FLOCKRELATION):
    case FAILURE(ACTION_TYPES.CREATE_FLOCKRELATION):
    case FAILURE(ACTION_TYPES.UPDATE_FLOCKRELATION):
    case FAILURE(ACTION_TYPES.DELETE_FLOCKRELATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_FLOCKRELATIONS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FLOCKRELATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FLOCKRELATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FLOCKRELATION):
    case SUCCESS(ACTION_TYPES.UPDATE_FLOCKRELATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FLOCKRELATION):
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

const apiUrl = 'api/flock-relations';
const apiSearchUrl = 'api/_search/flock-relations';

// Actions

export const getSearchEntities: ICrudSearchAction<IFlockRelation> = query => ({
  type: ACTION_TYPES.SEARCH_FLOCKRELATIONS,
  payload: axios.get<IFlockRelation>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IFlockRelation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FLOCKRELATION_LIST,
  payload: axios.get<IFlockRelation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFlockRelation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FLOCKRELATION,
    payload: axios.get<IFlockRelation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFlockRelation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FLOCKRELATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFlockRelation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FLOCKRELATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFlockRelation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FLOCKRELATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
