import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import getDirections from 'react-native-google-maps-directions'

import {ParkingLotsSelectors} from '../../Redux/ParkingLotsRedux'
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
      width: '100%',
      flexDirection: 'row',
      marginBottom: 30,
      marginRight: 30
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
  },
  capacity: {
    icon: {
      width: 20,
      height: 20,
      marginRight: 10
    },
    name: {
      fontSize: 14,
      color: '#313131',
      fontWeight: '500'
    },
    info: {
      fontSize: 14,
      color: '#232323',
      fontWeight: '600'
    },
    wrapper: {
      flexDirection: 'row',
      marginBottom: 12,
      justifyContent: 'space-between'
    }
  },
  button: {
    backgroundColor: '#0043EF',
    paddingVertical: 20
  }
}

class Detail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      capacity: [
        {
          name: 'Motorcycle parking',
          icon: 'motor_2'
        },
        {
          name: 'Car parking',
          icon: 'car_2'
        },
        {
          name: 'Minivan parking',
          icon: 'van'
        }
      ]
    }
  }

  handleNavigate = () => {
    const {activeParkingLotId, getParkingLot, userLocation} = this.props
    const activeParkingLot = getParkingLot(activeParkingLotId)

    const data = {
      source: userLocation,
      destination: {
        latitude: activeParkingLot.latitude,
        longitude: activeParkingLot.longitude
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving'
        },
        {
          key: 'dir_action',
          value: 'navigate'
        }
      ]
    }

    getDirections(data)
  }

  render () {
    const {activeParkingLotId, getParkingLot} = this.props
    const activeParkingLot = getParkingLot(activeParkingLotId)

    if (!activeParkingLot) {
      return null
    }

    return (
      <View>
        <Text style={styles.title}>{activeParkingLot.name}</Text>
        <View style={styles.address.wrapper}>
          <Icon icon='map' style={styles.address.icon} />
          <Text style={styles.address.text}>{activeParkingLot.address}</Text>
          <View style={{flex: 1}} />
          <TouchableOpacity onPress={this.handleNavigate}>
            <Icon icon='navigation' style={{width: 18, height: 18, marginRight: 10}} />
          </TouchableOpacity>
        </View>
        <View style={ApplicationStyles.section.wrapper}>
          <Text style={ApplicationStyles.section.title}>CAPACITY</Text>
          {
            this.state.capacity.map((c, index) => {
              return (
                <View style={styles.capacity.wrapper}>
                  <View style={styles.row}>
                    <Icon icon={c.icon} style={styles.capacity.icon} />
                    <Text style={styles.capacity.name}>{c.name}</Text>
                  </View>
                  <Text style={styles.capacity.info}>{activeParkingLot.sizes[index]} slots</Text>
                </View>
              )
            })
          }
        </View>
        <Button
          text='Book Parking Space'
          containerStyle={styles.button}
          style={{fontWeight: '600'}}
          onPressIn={() => this.props.navigation.navigate('Checkout')}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    userLocation: state.parkingLots.userLocation,
    activeParkingLotId: state.parkingLots.activeParkingLotId,
    getParkingLot: id => ParkingLotsSelectors.getParkingLot(state, id)
  }
}

export default withNavigation(connect(
  mapStateToProps,
  null
)(Detail))
