import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  searchRequest: ['address'],
  searchSuccess: ['payload'],
  searchFailure: null
})

export const SearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  location: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const SearchSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { address }) =>
  state.merge({ fetching: true, address, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, location: payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_REQUEST]: request,
  [Types.SEARCH_SUCCESS]: success,
  [Types.SEARCH_FAILURE]: failure
})
