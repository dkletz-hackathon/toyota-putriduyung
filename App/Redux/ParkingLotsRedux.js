import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  parkingLotsRequest: ['location, range'],
  parkingLotsSuccess: ['payload'],
  setActiveParkingLotId: ['id'],
  removeActiveParkingLot: null,
  parkingLotsFailure: null
})

export const ParkingLotsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  activeParkingLotId: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const ParkingLotsSelectors = {
  getParkingLots: (state, filters) => {
    if (state.parkingLots.data === null) {
      return null
    }
    if (filters === undefined || filters.length === 0) {
      filters = [0, 1, 2]
    }
    return state.parkingLots.data.map(parkingLot => ({
      ...parkingLot,
      size: parkingLot.sizes
        .reduce((total, el, index) => {
          if (filters.includes(index)) {
            return total + el
          }
          return total
        }, 0)
    }))
  },

  getParkingLot: (state, id) => {
    if (id === null || id === undefined) {
      return null
    }
    return state.parkingLots.data.find(parkingLot => parkingLot.id === id)
  }
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { location, range }) =>
  state.merge({ fetching: true, location, range, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  const data = payload.map(parkingLot => {
    const sizeCounter = [0, 0, 0]
    console.log(parkingLot.id)
    const returnedParkingLot = {
      ...parkingLot,
      size: parkingLot.spaces
        .filter(space => space.empty)
        .reduce((total, el) => {
          sizeCounter[el.size]++
          return total + 1
        }, 0)
    }
    returnedParkingLot.sizes = sizeCounter
    return returnedParkingLot
  })
  return state.merge({ fetching: false, error: null, data })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const setActive = (state, { id }) =>
  state.merge({ activeParkingLotId: id })

export const removeActive = state =>
  state.merge({ activeParkingLotId: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PARKING_LOTS_REQUEST]: request,
  [Types.PARKING_LOTS_SUCCESS]: success,
  [Types.PARKING_LOTS_FAILURE]: failure,
  [Types.SET_ACTIVE_PARKING_LOT_ID]: setActive,
  [Types.REMOVE_ACTIVE_PARKING_LOT]: removeActive
})
