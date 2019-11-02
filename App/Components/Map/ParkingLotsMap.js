import React, {Component} from 'react'
import {connect} from 'react-redux'

import MapView, {Marker} from 'react-native-maps'
import {Dimensions} from 'react-native'

const initialRegion = {
  latitude: -6.2290459,
  longitude: 106.7993198,
  longitudeDelta: 0.1,
  latitudeDelta: 0.1
}

class ParkingLotsMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      region: null,
    }
  }

  onRegionChange = (region) => {
    this.setState({
      region
    })
  }

  render () {
    const { parkingLots } = this.props
    return (
      <MapView
        style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
        initialRegion={initialRegion}
        onRegionChangeComplete={this.onRegionChange}
        showsUserLocation
      >
        {parkingLots ? parkingLots.map(parkingLot => (
          <Marker
            coordinate={{
              latitude: parkingLot.latitude,
              longitude: parkingLot.longitude
            }}
            title={parkingLot.name}
          />
        )) : null}
      </MapView>
    )
  }
}

const mapStateToProps = state => {
  return {
    parkingLots: state.parkingLots.data
  }
}

export default connect(
  mapStateToProps,
  null
)(ParkingLotsMap)
