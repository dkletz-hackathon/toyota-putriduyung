import React from 'react'
import {View, Text, Image} from 'react-native'
import Modal from 'react-native-modal'
import {withNavigation} from 'react-navigation'
import Button from '../../Components/Button'
import car from '../../Images/car.png'

const styles = {
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    width: '75%'
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5
  },
  button: {
    backgroundColor: '#0043EF',
    width: '100%'
  },
  content: {
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    marginBottom: 20,
    width: '75%',
    height: 120
  }
}

class SuccessModal extends React.Component {
  render() {
    return (
      <Modal isVisible={this.props.isVisible} style={styles.modal}>
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <Image source={car} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>Payment Success!</Text>
            <Text>Thank you for using ToyoPark!</Text>
          </View>
          <Button
            text="Back to Home"
            containerStyle={styles.button}
            onPress={() => this.props.navigation.goBack(null)}
          />
        </View>
      </Modal>
    )
  }
}

export default withNavigation(SuccessModal)