import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import {ParkingLotsSelectors} from '../../Redux/ParkingLotsRedux'
import Button from '../../Components/Button'
import Icon from '../../Components/Icon'
// import Header from '../../Components/Header'
import {ApplicationStyles} from '../../Themes'
import SuccessModal from './SuccessModal'

const styles = {
  wrapper: {
    padding: 15,
    paddingTop: 60,
    flex: 1
  },
  header: {
    wrapper: {
      flexDirection: 'row',
      marginBottom: 40
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 25
    },
    text: {
      fontSize: 17,
      fontWeight: '600',
      color: '#4A4A4A'
    }
  },
  part: {
    marginBottom: 15
  },
  section: {
    wrapper: {
      marginVertical: 10,
      flexDirection: 'row',
      paddingRight: 30
    },
    icon: {
      width: 25,
      height: 25,
      marginRight: 17
    },
    text: {
      paddingRight: 30,
      paddingTop: 5
    }
  },
  payment: {
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10
    },
    name: {
      fontWeight: '500'
    },
    info: {
      textAlign: 'right',
      fontWeight: 'bold'
    }
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
    marginBottom: 25
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  address: {
    fontSize: 12,
    color: '#4B4B4B',
    lineHeight: 18
  },
  footer: {
    wrapper: {
      paddingBottom: 20
    },
    button: {
      backgroundColor: '#0043EF',
      paddingVertical: 20
    }
  }
}

const PricePerHour = 4000

class CheckoutScreen extends React.Component {
  constructor (props) {
    super(props)
    const timeBefore = new Date()
    let timeAfter = new Date()
    timeAfter.setHours(timeAfter.getHours() + 1)
    this.state = {
      successModal: false,
      showPicker: false,
      timeBefore,
      timeAfter,
      mode: 'before'
    }
    this.bookNow = this.bookNow.bind(this)
  }

  bookNow () {
    this.setState({successModal: true})
  }

  openAfter = () => {
    this.setState({
      showPicker: true,
      mode: 'after'
    })
  }

  openBefore = () => {
    this.setState({
      showPicker: true,
      mode: 'before'
    })
  }

  setDate = (event, date) => {
    if (this.state.mode === 'before') {
      this.setState({
        showPicker: false,
        timeBefore: date
      })
    } else {
      this.setState({
        showPicker: false,
        timeAfter: date
      })
    }
  }

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  render () {
    const { showPicker, mode, timeBefore, timeAfter } = this.state
    const value = mode === 'before' ? timeBefore : timeAfter
    const { activeParkingLotId, getParkingLot } = this.props
    const activeParkingLot = getParkingLot(activeParkingLotId)

    const momentBefore = moment(timeBefore)
    const momentAfter = moment(timeAfter)

    let hourDiff = Math.ceil(momentAfter.diff(momentBefore, 'minutes') / 60)
    return (
      <React.Fragment>
        {
          showPicker && <DateTimePicker
            value={value}
            mode='time'
            onChange={this.setDate}
          />
        }
        <SuccessModal isVisible={this.state.successModal} />
        <View style={styles.wrapper}>
          <View style={styles.header.wrapper}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.props.navigation.goBack(null)}
            >
              <Icon icon='back' style={styles.header.icon} />
            </TouchableOpacity>
            <Text style={styles.header.text}>Order Summary</Text>
          </View>
          <View style={styles.part}>
            <Text style={ApplicationStyles.section.title}>PARKING LOCATION</Text>
            <View style={styles.section.wrapper}>
              <Icon icon='map' style={styles.section.icon} />
              <View style={styles.section.text}>
                <Text style={styles.name}>{activeParkingLot.name}</Text>
                <Text style={styles.address}>{activeParkingLot.address}</Text>
              </View>
            </View>
            <View style={styles.section.wrapper}>
              <Icon icon='time' style={styles.section.icon} />
              <View style={{...styles.section.text, flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.openBefore}>
                  <Text style={styles.name}>{moment(timeBefore).format('HH:mm')}</Text>
                </TouchableOpacity>
                <Text style={styles.name}> - </Text>
                <TouchableOpacity onPress={this.openAfter}>
                  <Text style={styles.name}>{moment(timeAfter).format('HH:mm')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.part}>
            <Text style={ApplicationStyles.section.title}>INCOMING VEHICLE</Text>
            <View style={styles.section.wrapper}>
              <Icon icon='car' style={styles.section.icon} />
              <View style={styles.section.text}>
                <Text style={styles.name}>Toyota GR Supra 2019</Text>
                <Text style={styles.address}>B 2996 DC</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.part}>
            <Text style={ApplicationStyles.section.title}>PAYMENT SUMMARY</Text>
            <View style={styles.payment.wrapper}>
              <Text style={styles.payment.name}>Ticket Price</Text>
              <Text style={styles.payment.info}>Rp 4.000</Text>
            </View>
            <View style={styles.payment.wrapper}>
              <Text style={styles.payment.name}>Time</Text>
              <Text style={styles.payment.info}>{hourDiff} Hours</Text>
            </View>
            <View style={styles.payment.wrapper}>
              <Text style={styles.payment.name}>Total Price</Text>
              <Text style={styles.payment.info}>Rp {this.numberWithCommas(hourDiff * PricePerHour)}</Text>
            </View>
          </View>
          <View style={{flexGrow: 1}} />
          <View style={styles.footer.wrapper}>
            <Button
              containerStyle={styles.footer.button}
              style={{fontWeight: '500'}}
              text='Book Now'
              onPress={this.bookNow}
            />
          </View>
        </View>

      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    getParkingLot: id => ParkingLotsSelectors.getParkingLot(state, id),
    activeParkingLotId: state.parkingLots.activeParkingLotId
  }
}

export default connect(
  mapStateToProps,
  null
)(CheckoutScreen)
