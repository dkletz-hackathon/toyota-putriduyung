import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapView, {Marker} from 'react-native-maps'
import {Dimensions, View, Image, Text} from 'react-native'
import * as Animatable from 'react-native-animatable'

import Creators, {ParkingLotsSelectors} from '../../Redux/ParkingLotsRedux'
import { remove } from 'ramda'

const InitialRegion = {
  latitude: -6.2290459,
  longitude: 106.7993198,
  longitudeDelta: 0.1,
  latitudeDelta: 0.1
}

const DefaultRange = 1000

const mapText = {
  color: 'white',
  fontWeight: '500'
}

class ParkingLotsMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      region: null,
      map: null
    }
    props.fetchParkingLots(InitialRegion, DefaultRange)
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {searchLocation} = this.props
    const {region} = this.state
    const {region: oldRegion} = prevState

    if (oldRegion !== region) {
      return
    }

    if (this.map !== null && searchLocation !== null) {
      this.map.animateToRegion({
        ...this.state.region,
        latitude: searchLocation.lat,
        longitude: searchLocation.lng
      })
    }
  }

  onRegionChange = (region) => {
    const {fetchParkingLots} = this.props
    this.setState({
      region
    })
    fetchParkingLots(region, DefaultRange)
  }

  onPanDrag = () => {
    const {activeParkingLotId, removeActive} = this.props
    if (activeParkingLotId !== null && activeParkingLotId !== undefined) {
      removeActive()
    }
  }

  render () {
    const { getParkingLots, filters, setActive } = this.props
    const parkingLots = getParkingLots(filters)
    return (
      <MapView
        ref={ref => { this.map = ref }}
        style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
        initialRegion={InitialRegion}
        onRegionChangeComplete={this.onRegionChange}
        onPanDrag={this.onPanDrag}
        showsUserLocation
      >
        {parkingLots ? parkingLots.map(parkingLot => (
          <Marker
            onPress={() => {
              console.log(parkingLot.id)
              setActive(parkingLot.id)
            }}
            coordinate={{
              latitude: parkingLot.latitude,
              longitude: parkingLot.longitude
            }}
            title={parkingLot.name}
          >
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={{zIndex: 1, position: 'absolute'}}>
                <Text style={mapText}>{parkingLot.size}</Text>
              </View>
              <Image style={{width: 40, height: 40}} source={require('../../Images/circle.png')} />
            </View>
          </Marker>
        )) : null}
      </MapView>
    )
  }
}

const mapStateToProps = state => {
  return {
    getParkingLots: (filters) => ParkingLotsSelectors.getParkingLots(state, filters),
    searchLocation: state.search.location,
    activeParkingLotId: state.parkingLots.activeParkingLotId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchParkingLots: (location, range) => dispatch(Creators.parkingLotsRequest({ location, range })),
    removeActive: () => dispatch(Creators.removeActiveParkingLot()),
    setActive: (id) => dispatch(Creators.setActiveParkingLotId(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParkingLotsMap)
