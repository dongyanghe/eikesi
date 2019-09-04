import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import axios from 'axios';
import sinon from 'sinon';

import account, { ACTION_TYPES, saveAccountSettings } from 'app/shared/reducers/settings';
import { ACTION_TYPES as authActionTypes } from 'app/shared/reducers/authentication';

describe('Settings reducer tests', () => {
  describe('Common tests', () => {
    it('should return the initial state', () => {
      const toTest = account(undefined, {});
      expect(toTest).toMatchObject({
        loading: false,
        errorMessage: null,
        updateSuccess: false,
        updateFailure: false
      });
    });
  });

  describe('Settings update', () => {
    it('should detect a request', () => {
      const toTest = account(undefined, { type: REQUEST(ACTION_TYPES.UPDATE_ACCOUNT) });
      expect(toTest).toMatchObject({
        updateSuccess: false,
        updateFailure: false,
        loading: true
      });
    });
    it('should detect a success', () => {
      const toTest = account(undefined, { type: SUCCESS(ACTION_TYPES.UPDATE_ACCOUNT) });
      expect(toTest).toMatchObject({
        updateSuccess: true,
        updateFailure: false,
        loading: false
      });
    });
    it('should detect a failure', () => {
      const toTest = account(undefined, { type: FAILURE(ACTION_TYPES.UPDATE_ACCOUNT) });
      expect(toTest).toMatchObject({
        updateSuccess: false,
        updateFailure: true,
        loading: false
      });
    });
  });

  describe('Actions', () => {
    let store;

    const resolvedObject = { value: 'whatever' };
    beforeEach(() => {
      const mockStore = configureStore([thunk, promiseMiddleware()]);
      store = mockStore({});
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches UPDATE_ACCOUNT_PENDING and UPDATE_ACCOUNT_FULFILLED actions', async () => {
      const meta = {
        successMessage: 'translation-not-found[settings.messages.success]'
      };

      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.UPDATE_ACCOUNT),
          meta
        },
        {
          type: SUCCESS(ACTION_TYPES.UPDATE_ACCOUNT),
          payload: resolvedObject,
          meta
        },
        {
          type: REQUEST(authActionTypes.GET_SESSION)
        },
        {
          type: SUCCESS(authActionTypes.GET_SESSION),
          payload: resolvedObject
        }
      ];
      await store.dispatch(saveAccountSettings({})).then(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});