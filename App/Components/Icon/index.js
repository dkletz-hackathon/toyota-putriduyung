import * as React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {icons} from './icons';

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
});

export default function Icon(props) {
  const {icon, style, containerStyle} = props;
  const imageStyle = {...styles.image, ...style};

  return (
    <View style={containerStyle}>
      <Image style={imageStyle} source={icons[icon]} />
    </View>
  );
}
