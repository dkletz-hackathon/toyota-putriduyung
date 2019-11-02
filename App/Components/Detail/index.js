import React from 'react'
import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import Icon from '../Icon'
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
      marginRight: 12,
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

export default class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: [
        {
          name: 'Sedan',
          icon: 'sedan',
          checked: false
        },
        {
          name: 'Motorcycle',
          icon: 'motor',
          checked: false
        },
        {
          name: 'Minivan',
          icon: 'van',
          checked: false
        }
      ]
    }
    this.filterStyle = this.filterStyle.bind(this)
  }

  filterStyle(checked) {
    return checked ? styles.filter.checked : styles.filter.unchecked
  }

  setFilter(i) {
    let {filters} = this.state
    filters[i].checked = !filters[i].checked
    if (filters[i].checked) {
      if (filters[i].name === 'Sedan') filters[i].icon = 'sedan_white'
      if (filters[i].name === 'Minivan') filters[i].icon = 'van_white'
      if (filters[i].name === 'Motorcycle') filters[i].icon = 'motor_white'
    } else {
      if (filters[i].name === 'Sedan') filters[i].icon = 'sedan'
      if (filters[i].name === 'Minivan') filters[i].icon = 'van'
      if (filters[i].name === 'Motorcycle') filters[i].icon = 'motor'
    }
    this.setState({filters})
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>Toyo Parking Letjen S. Parman</Text>
        <View style={styles.address.wrapper}>
          <Icon icon="map" style={styles.address.icon} />
          <Text style={styles.address.text}>Jl. Letjen S. Parman No.28, Duren Sel., Kec. Grogol petamburan, Kota Jakarta Barat</Text>
        </View>
        <View style={ApplicationStyles.section.wrapper}>
          <Text style={ApplicationStyles.section.title}>FILTER</Text>
          <ScrollView style={styles.carousel} horizontal={true}>
            {
              this.state.filters.map((f, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={this.filterStyle(f.checked).wrapper}
                    activeOpacity={0.8}
                    onPress={() => this.setFilter(i)}
                  >
                    <Icon icon={f.icon} style={styles.filter.icon} />
                    <Text style={this.filterStyle(f.checked).name}>{f.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
        <View style={ApplicationStyles.section.wrapper}>
          <Text style={ApplicationStyles.section.title}>FEATURES</Text>
        </View>
      </View>
    )
  }
}