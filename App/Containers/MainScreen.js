import React from 'react'
import { View, PanResponder, Animated, Dimensions } from 'react-native'
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
      filters: []
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
      toValue: -ModalHeight + 300,
      duration: 300
    }).start()
  }

  openModal = () => {
    Animated.timing(this.state.modalYPos, {
      toValue: 0,
      duration: 500
    }).start()
  }

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const {dx, dy} = gestureState
        return !((dx > 2 || dx <= -2) || (dy > 2 || dy <= -2))
      },
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {},

      onPanResponderMove: (e, {dx, dy}) => {
        // console.log(dy, this.state.modalYPos)
        Animated.event([
          null,
          {dx: null, dy: this.state.modalYPos}
        ])(e, {dx, dy: -dy})
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

  render () {
    const { activeParkingLotId } = this.props
    const isSearch = activeParkingLotId === null || activeParkingLotId === undefined

    this.isSearch = isSearch

    if (!isSearch) {
      this.closeModalAsDetail()
    }

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
              ? <Search onChangeFilters={this.onChangeFilters} />
              : <Detail />
          }
        </Animated.View>
        <ParkingLotsMap filters={this.state.filters} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    activeParkingLotId: state.parkingLots.activeParkingLotId,
    getParkingLot: (id) => ParkingLotsSelectors.getParkingLot(state, id)
  }
}

export default connect(
  mapStateToProps,
  null
)(MainScreen)
