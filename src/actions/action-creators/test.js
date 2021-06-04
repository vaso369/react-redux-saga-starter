// @flow
import type { ActionFormat } from '../action-flow'
import * as actionTypes from '../action-types'

export function fetchTestData(): ActionFormat {
  return {
    type: actionTypes.TEST_ACTION,
  }
}

export function fetchTestDataSuccess(response: Array<Object>): ActionFormat {
  return {
    type: actionTypes.TEST_ACTION_SUCCESS,
    payload: response,
  }
}

export function fetchTestDataFailed(message: string): ActionFormat {
  return {
    type: actionTypes.TEST_ACTION_FAILED,
    status: 'error',
    payload: message,
  }
}
