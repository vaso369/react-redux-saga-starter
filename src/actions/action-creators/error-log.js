// @flow
import type { ActionFormat } from '../action-flow'
import * as actionTypes from '../action-types'

export function logErrorInfo(data: Object): ActionFormat {
  return {
    type: actionTypes.LOG_ERROR_INFO,
    payload: data,
  }
}

export function logErrorInfoSuccess(response: Array<Object>): ActionFormat {
  return {
    type: actionTypes.LOG_ERROR_INFO_SUCCESS,
    payload: response,
  }
}

export function logErrorInfoFailed(message: string): ActionFormat {
  return {
    type: actionTypes.LOG_ERROR_INFO_FAILED,
    status: 'error',
    payload: message,
  }
}
