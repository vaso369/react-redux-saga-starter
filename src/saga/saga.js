import {
  all,
  call,
  put,
  takeLatest
} from "redux-saga/effects";
import * as testActions from '../actions/action-creators/test';
import * as actionTypes from '../actions/action-types';
import Api from "../api/Api";

function* testAction(action) {
  try {
    const api = new Api()

    const response = yield call(api.test.bind(api))

      yield put(testActions.fetchTestDataSuccess(response))

  } catch (e) {
    yield put(testActions.fetchTestDataFailed('Failed to fetch data!'))
  }
}

// rootSaga should yield all our sagas
export default function* rootSaga() {
  yield all([
    takeLatest(actionTypes.TEST_ACTION, testAction),
  ])
}
