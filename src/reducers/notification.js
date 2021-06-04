// @flow
import type { ActionFormat } from '../actions/action-flow' // this is just a helper for flow
import * as actionTypes from '../actions/action-types'

// the format of state that we expect
type notificationState = {
  msg: string,
  type: string,
}

// default state (we export it for tests)
export const defaultState: notificationState = {
  msg: '',
  type: '',
  isOpen: false,
}

/**
 * Notification reducer
 * @param state
 * @param action
 * @returns {*}
 */
export const notification = (
  state: notificationState = defaultState,
  action: ActionFormat,
): notificationState => {
  switch (action.type) {
    //-----------------------------------------------------------------
    case actionTypes.SHOW_NOTIFICATION_SUCCESS:
      return {
        ...state,
        msg: action.payload,
        type: 'success',
      }

    //-----------------------------------------------------------------
    case actionTypes.SHOW_NOTIFICATION_ERROR:
      return {
        ...state,
        msg: action.payload,
        type: 'error',
      }

    //-----------------------------------------------------------------
    case actionTypes.HIDE_NOTIFICATION:
      return {
        ...state,
        msg: '',
        type: '',
      }

    //-----------------------------------------------------------------
    default:
      return state
  } // end switch
}
