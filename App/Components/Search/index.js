import React from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import Icon from '../../Components/Icon'
import {ApplicationStyles} from '../../Themes'

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },
  searchText: {
    marginLeft: 12,
    fontSize: 15
  },
  icon: {
    width: 20,
    height: 20
  },
  recentWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 5
  },
  recentInfo: {
    marginLeft: 15
  },
  recentName: {
    marginBottom: 5
  },
  recentAddress: {
    color: '#7D7D7D',
    fontSize: 13
  }
})

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recent: [1, 2, 3]
    }
  }

  render() {
    return (
      <View>
        <View style={styles.searchWrapper}>
          <Icon style={styles.icon} icon="search" />
          <TextInput style={styles.searchText} placeholder="Search for a parking space..." />
        </View>
        <Text style={ApplicationStyles.section.title}>RECENT SEARCH</Text>
        {
          this.state.recent.map(r => {
            return (
              <View style={styles.recentWrapper}>
                <Icon icon="map" style={{width: 25, height: 25}} />
                <View style={styles.recentInfo}>
                  <Text style={styles.recentName}>Hehe</Text>
                  <Text style={styles.recentAddress}>Jl. Guntur 7, Kayuringin Jaya, Bekasi Selatan</Text>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}