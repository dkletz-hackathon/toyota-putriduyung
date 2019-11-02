// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import Geocoder from "react-native-geocoding"

// our "constructor"
const create = (baseURL = 'https://desolate-anchorage-54298.herokuapp.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  const getParkingLots = async (location, range) => {
    const response = await api.get('parking')
    return {
      ok: true,
      data: response.data.data.map(parkingLot => ({
        ...parkingLot,
        latitude: parseFloat(parkingLot.latitude),
        longitude: parseFloat(parkingLot.longitude)
      }))
    }
  }
  const getLatLong = async ({address}) => {
    try {
      const json = await Geocoder.from(address)
      return {
        ok: true,
        data: json.results[0].geometry.location
      }
    } catch (err) {
      console.error(err)
      return {
        ok: false
      }
    }
  }

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    getParkingLots,
    getLatLong
  }
}

// let's return back our create method as the default.
export default {
  create
}
