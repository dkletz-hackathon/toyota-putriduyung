import Geocoder from 'react-native-geocoding'

Geocoder.init('AIzaSyAr43OFCk1TQ6WBrDbB7pvrPWluxu7KWWM')

export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  },
  getParkingLots: (location, range) => {
    const parkingLots = require('../Fixtures/parkingLot')
    return {
      ok: true,
      data: parkingLots
    }
  },
  getLatLong: async ({ address }) => {
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
}
