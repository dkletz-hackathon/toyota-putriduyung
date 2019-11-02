import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Search from '../Components/Search'
import {Metrics} from '../Themes'

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    backgroundColor: 'gray',
    flex: 1
  },
  modal: {
    padding: 25,
    paddingTop: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    minHeight: 250
  }
})

export default class MainScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modal}>
          <Search />
        </View>
      </View>
    )
  }
}