import React from 'react'
import { View, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native'
import Search from '../Components/Search'
import ParkingLotsMap from '../Components/Map/ParkingLotsMap'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flex: 1
  },
  modal: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    width: '100%',
    padding: 25,
    paddingTop: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    minHeight: 250
  }
})

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
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {},

      onPanResponderMove: (e, {dx, dy}) => {
        console.log(dy, this.state.modalYPos)
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
          style={{...styles.modal,
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
          <Search />
        </Animated.View>
        <ParkingLotsMap />
      </View>
    )
  }
}
