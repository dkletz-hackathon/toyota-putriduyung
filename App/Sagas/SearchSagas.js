/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import SearchActions from '../Redux/SearchRedux'
// import { SearchSelectors } from '../Redux/SearchRedux'

export function * getSearch (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(SearchSelectors.getData)
  // make the call to the api
  const response = yield call(api.getsearch, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(SearchActions.searchSuccess(response.data))
  } else {
    yield put(SearchActions.searchFailure())
  }
}

export function * getLatLong (api, action) {
  const { address } = action
  const response = yield call(api.getLatLong, address)

  if (response.ok) {
    yield put(SearchActions.searchSuccess(response.data))
  } else {
    yield put(SearchActions.searchFailure())
  }
}
