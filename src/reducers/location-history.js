// @flow
import { LOCATION_CHANGE } from 'react-router-redux'

type LocationType = {
  pathname: string,
  hash: string,
  search: string,
}

type RouterAction = {
  type: string,
  payload: {
    action: string,
    location: LocationType,
  },
}

type locationHistoryState = {
  previous: null | LocationType,
  current: null | LocationType,
}

export const defaultLocationHistoryState = {
  previous: null,
  current: null,
}

export const locationHistory = (
  state: locationHistoryState = defaultLocationHistoryState,
  action: RouterAction,
): locationHistoryState => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        // replace changes only the current location
        previous:
          action.payload.action === 'REPLACE' ? state.previous : state.current,
        current: action.payload.location,
      }

    default:
      return state
  } // end switch
}
