import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import {spacing} from '../../styles';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: spacing[4],
  },
});

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Button preset="icon" onPress={() => {}}>
          <Icon icon="back" />
        </Button>
      </View>
    );
  }
}
