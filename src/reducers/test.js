// @flow
import type { ActionFormat } from '../actions/action-flow' // this is just a helper for flow
import * as actionTypes from '../actions/action-types'

const defaultState = {
  data: null,
  timestamp: null,
  isLoading: false,
}

/**
 * Test reducer
 * @param state
 * @param action
 * @returns {*}
 */
export const test = (state = defaultState, action: ActionFormat) => {
  switch (action.type) {
    //-----------------------------------------------------------------
    case actionTypes.TEST_ACTION:
      return {
        ...state,
        isLoading: true,
      }

    //-----------------------------------------------------------------
    case actionTypes.TEST_ACTION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }

    //-----------------------------------------------------------------
    case actionTypes.TEST_ACTION_FAILED:
      return {
        ...state,
        isLoading: false,
      }

    //-----------------------------------------------------------------
    default:
      return state
  } // end switch
}
