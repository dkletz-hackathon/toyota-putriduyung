import React from 'react'
import { View, PanResponder, Animated, Dimensions, ActivityIndicator } from 'react-native'
import {connect} from 'react-redux'

import {ParkingLotsSelectors} from '../Redux/ParkingLotsRedux'
import Search from '../Components/Search'
import Detail from '../Components/Detail'
import ParkingLotsMap from '../Components/Map/ParkingLotsMap'

const styles = {
  container: {
    backgroundColor: 'gray',
    flex: 1
  },
  modal: {
    drag: {
      backgroundColor: '#D9E3FF',
      height: 5,
      width: 50,
      marginBottom: 24,
      borderRadius: 20
    },
    wrapper: {
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      width: '100%',
      padding: 25,
      paddingTop: 20,
      borderRadius: 20,
      backgroundColor: 'white',
      minHeight: 250
    }
  }
}

const ModalHeight = Dimensions.get('window').height * 60 / 100
let SearchHeight = 196
const VelocityModalClose = 0.05

class MainScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalYPos: new Animated.Value(
        -ModalHeight + SearchHeight
      ),
      filters: [],
      features: []
    }
  }

  closeModal = () => {
    Animated.timing(this.state.modalYPos, {
      toValue: -ModalHeight + SearchHeight,
      duration: 300
    }).start()
  }

  closeModalAsDetail = () => {
    Animated.timing(this.state.modalYPos, {
      toValue: -ModalHeight + 360,
      duration: 300
    }).start()
  }

  openModal = () => {
    Animated.timing(this.state.modalYPos, {
      toValue: 0,
      duration: 500
    }).start()
  }

  getModalBottomPos = () => {
    const { activeParkingLotId } = this.props
    const isSearch = activeParkingLotId === null || activeParkingLotId === undefined

    if (isSearch) {
      return -ModalHeight + SearchHeight
    } else {
      return -ModalHeight + 360
    }
  }

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const {dy} = gestureState
        return !((dy > 5 || dy <= -5))
      },
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {},

      onPanResponderMove: (e, { moveX, moveY }) => {
        console.log(moveY, this.state.modalYPos)
        Animated.event([
          null,
          {moveX: null, moveY: this.state.modalYPos}
        ])(e, {moveX, moveY: -moveY - this.getModalBottomPos()})
      },

      onPanResponderRelease: (e, {vx, vy}) => {
        if (vy > VelocityModalClose) {
          if (this.isSearch) {
            this.closeModal()
          } else {
            this.closeModalAsDetail()
          }
        } else {
          this.openModal()
        }
      }
    })
  }

  onChangeFilters = filters => {
    const newFilters = filters.filter(filter => filter.checked)
      .map(filter => {
        switch (filter.name) {
          case 'Sedan':
            return 1
          case 'Motorcycle':
            return 0
          case 'Minivan':
            return 2
        }
      }
    )
    this.setState({
      filters: newFilters
    })
  }

  onChangeFeatures = features => {
    const newFeatures = features.filter(feature => feature.checked)
      .map(feature => feature.value)
    this.setState({
      features: newFeatures
    })
  }

  render () {
    const { activeParkingLotId, fetching } = this.props
    const isSearch = activeParkingLotId === null || activeParkingLotId === undefined

    this.isSearch = isSearch

    return (
      <View style={styles.container}>
        <Animated.View
          style={{...styles.modal.wrapper,
            bottom: this.state.modalYPos.interpolate({
              inputRange: [
                -ModalHeight + SearchHeight,
                0
              ],
              outputRange: [
                -ModalHeight + SearchHeight,
                0
              ],
              extrapolate: 'clamp'
            })}}
          {...this._panResponder.panHandlers}
        >
          <View style={{alignItems: 'center'}}>
            <View style={styles.modal.drag} />
          </View>
          {
            isSearch
              ? <Search onChangeFilters={this.onChangeFilters} onChangeFeatures={this.onChangeFeatures} />
              : <Detail />
          }
        </Animated.View>
        <Animated.View
          style={{zIndex: 0,
            position: 'absolute',
            bottom: this.state.modalYPos.interpolate({
              inputRange: [
                -ModalHeight + SearchHeight,
                0
              ],
              outputRange: [
                20,
                ModalHeight / 2
              ],
              extrapolate: 'clamp'
            })}}
        >
          <ParkingLotsMap filters={this.state.filters} features={this.state.features} />
        </Animated.View>
        { fetching
          ? <ActivityIndicator
            style={{position: 'absolute', top: 10, right: 10, zIndex: 2}}
            color={'#0043EF'}
          /> : null }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    activeParkingLotId: state.parkingLots.activeParkingLotId,
    fetching: state.parkingLots.fetching,
    getParkingLot: (id) => ParkingLotsSelectors.getParkingLot(state, id)
  }
}

export default connect(
  mapStateToProps,
  null
)(MainScreen)
