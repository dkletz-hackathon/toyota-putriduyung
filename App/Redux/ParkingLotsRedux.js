import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  parkingLotsRequest: ['location, range'],
  parkingLotsSuccess: ['payload'],
  parkingLotsFailure: null
})

export const ParkingLotsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const ParkingLotsSelectors = {
  getData: state => state.parkingLots.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { location, range }) =>
  state.merge({ fetching: true, location, range, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PARKING_LOTS_REQUEST]: request,
  [Types.PARKING_LOTS_SUCCESS]: success,
  [Types.PARKING_LOTS_FAILURE]: failure
})