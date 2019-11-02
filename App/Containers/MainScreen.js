import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Search from '../Components/Search'
import Detail from '../Components/Detail'
import {Metrics} from '../Themes'

const styles = {
  container: {
    paddingTop: 100,
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
      padding: 25,
      paddingTop: 20,
      borderRadius: 20,
      backgroundColor: 'white',
      minHeight: 250
    }
  }
}

export default class MainScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modal.wrapper}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.modal.drag} />
          </View>
          <Detail />
        </View>
      </View>
    )
  }
}