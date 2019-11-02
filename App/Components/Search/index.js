import React from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'

import Icon from '../../Components/Icon'
import {ApplicationStyles} from '../../Themes'
import Creators from '../../Redux/SearchRedux'

const filter = {
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#0043EF',
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

const feature = {
  wrapper: {
    borderColor: '#0043EF',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 8
  },
  name: {
    fontSize: 14,
    color: '#0043EF'
  }
}

const styles = {
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  searchText: {
    marginLeft: 12,
    fontSize: 15
  },
  carousel: {
    flexDirection: 'row',
    overflow: 'scroll'
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
        backgroundColor: '#0043EF'
      },
      name: {
        ...filter.name,
        color: 'white'
      }
    }
  },
  feature: {
    unchecked: {
      wrapper: {
        ...feature.wrapper
      },
      name: {
        ...feature.name
      }
    },
    checked: {
      wrapper: {
        ...feature.wrapper,
        backgroundColor: '#0043EF'
      },
      name: {
        ...feature.name,
        color: 'white'
      }
    }
  }
}

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      recent: [1, 2],
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
      ],
      features: [
        {
          value: 'disabled',
          name: 'Disabled',
          checked: false
        },
        {
          value: 'woman',
          name: 'Women Parking',
          checked: false
        },
        {
          value: 'cover',
          name: 'Covered',
          checked: false
        }
      ]
    }
  }

  onSubmit = () => {
    const {query} = this.state
    const {search} = this.props
    search(query)
  }

  filterStyle (checked) {
    return checked ? styles.filter.checked : styles.filter.unchecked
  }

  featureStyle (checked) {
    return checked ? styles.feature.checked : styles.feature.unchecked
  }

  setFilter (i) {
    const {onChangeFilters} = this.props
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
    onChangeFilters(filters)
    this.setState({filters})
  }

  setFeature (i) {
    const {onChangeFeatures} = this.props
    let {features} = this.state
    features[i].checked = !features[i].checked
    this.setState({features})
    onChangeFeatures(features)
  }

  render () {
    return (
      <View>
        <View style={styles.searchWrapper}>
          <Icon style={styles.icon} icon='search' />
          <TextInput
            style={styles.searchText}
            placeholder='Search for a parking space...'
            onChangeText={text => this.setState({ query: text })}
            onSubmitEditing={this.onSubmit}
          />
        </View>
        <View style={ApplicationStyles.section.wrapper}>
          <Text style={ApplicationStyles.section.title}>RECENT SEARCH</Text>
          {
            this.state.recent.map(r => {
              return (
                <View style={styles.recentWrapper}>
                  <Icon icon='map' style={{width: 25, height: 25}} />
                  <View style={styles.recentInfo}>
                    <Text style={styles.recentName}>Hehe</Text>
                    <Text style={styles.recentAddress}>Jl. Guntur 7, Kayuringin Jaya, Bekasi Selatan</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
        <View style={ApplicationStyles.section.wrapper}>
          <Text style={ApplicationStyles.section.title}>VEHICLE TYPE</Text>
          <ScrollView style={styles.carousel} horizontal>
            {
              this.state.filters.map((f, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={this.filterStyle(f.checked).wrapper}
                    activeOpacity={0.8}
                    onPressIn={() => this.setFilter(i)}
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
          <View style={{flexDirection: 'row'}}>
            {
              this.state.features.map((f, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.6}
                    style={this.featureStyle(f.checked).wrapper}
                    onPressIn={() => this.setFeature(i)}
                  >
                    <Text style={this.featureStyle(f.checked).name}>{f.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: (query) => dispatch(Creators.searchRequest({ address: query }))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Search)
