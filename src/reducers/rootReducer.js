// @flow

import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { locationHistory } from '../reducers/location-history';
import { notification } from '../reducers/notification';
import { test } from './test';

// Combine Reducers
const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    locationHistory,
    test,
    notification,
  })

export default rootReducer
