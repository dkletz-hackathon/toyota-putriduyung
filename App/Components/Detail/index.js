import React from 'react'
import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import Icon from '../Icon'
import Button from '../Button'
import {withNavigation} from 'react-navigation'
import {ApplicationStyles} from '../../Themes'

const filter = {
  wrapper: {
    padding: 15,
    borderColor: '#5C86FF',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 5,
    width: 150
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#2D50B5'
  }
}

const styles = {
  row: {
    flexDirection: 'row'
  },
  carousel: {
    flexDirection: 'row',
    overflow: 'scroll'
  },
  title: {
    color: '#232323',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15
  },
  address: {
    wrapper: {
      flexDirection: 'row',
      marginBottom: 20
    },
    icon: {
      width: 25,
      height: 25,
      marginRight: 12
      // backgroundColor: 'blue'
    },
    text: {
      fontSize: 13,
      color: '#4B4B4B',
      lineHeight: 20
    }
  },
  filter: {
    icon: {
      height: 40,
      width: 40,
      marginBottom: 5
    },
    unchecked: {
      wrapper: {
        ...filter.wrapper
      },
      name: {
        ...filter.name
      }
    },
    checked: {
      wrapper: {
        ...filter.wrapper,
        backgroundColor: '#5C86FF'
      },
      name: {
        ...filter.name,
        color: 'white'
      }
    }
  }
}

class Detail extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View>
        <Text style={styles.title}>Toyo Parking Letjen S. Parman</Text>
        <View style={styles.address.wrapper}>
          <Icon icon='map' style={styles.address.icon} />
          <Text style={styles.address.text}>Jl. Letjen S. Parman No.28, Duren Sel., Kec. Grogol petamburan, Kota Jakarta Barat</Text>
        </View>
        <Button
          text='Book Parking Space'
          onPress={() => this.props.navigation.navigate('Checkout')}
        />
      </View>
    )
  }
}

export default withNavigation(Detail)
