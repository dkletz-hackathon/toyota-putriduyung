import React from 'react'
import {View, Text} from 'react-native'
import Modal from 'react-native-modal'
import {withNavigation} from 'react-navigation'
import Button from '../../Components/Button'

const styles = {
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontWeight: '600',
    fontSize: 18
  }
}

class SuccessModal extends React.Component {
  render() {
    return (
      <Modal isVisible={this.props.isVisible}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Payment Success!</Text>
          <Button
            text="Back to Home"
          />
        </View>
      </Modal>
    )
  }
}

export default withNavigation(SuccessModal)