// @flow

// import the list of all action types
// this is just a helper for flow
import type { ActionFormat } from '../action-flow'
import * as actionTypes from '../action-types'


export function showSuccessNotification(msg: string) {
  return {
    type: actionTypes.SHOW_NOTIFICATION_SUCCESS,
    payload: msg,
  }
}

export function showErrorNotification(msg: string) {
  return {
    type: actionTypes.SHOW_NOTIFICATION_ERROR,
    payload: msg,
  }
}

export function hideNotification(): ActionFormat {
  return {
    type: actionTypes.HIDE_NOTIFICATION,
  }
}
