import React from 'react'
import { View, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native'
import Search from '../Components/Search'
import Detail from '../Components/Detail'
import {Metrics} from '../Themes'
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
      marginBottom: 30,
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
const SearchHeight = 168
const VelocityModalClose = 0.05

export default class MainScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalYPos: new Animated.Value(
        -ModalHeight + SearchHeight
      )
    }
  }

  closeModal = () => {
    Animated.timing(this.state.modalYPos, {
      toValue: -ModalHeight + SearchHeight,
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
          this.closeModal()
        } else {
          this.openModal()
        }
      }
    })
  }

  render () {
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
          <Detail />
        </Animated.View>
        <ParkingLotsMap />
      </View>
    )
  }
}
