import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {viewPresets, textPresets} from './preset';

export default function Button(props) {
  const {
    text,
    preset = 'button',
    children,
    style,
    containerStyle,
    ...rest
  } = props;

  const viewStyle = {...viewPresets[preset], ...containerStyle};
  const textStyle = {...textPresets[preset], ...style};

  const content = children || <Text style={textStyle}>{text}</Text>;

  return (
    <TouchableOpacity activeOpacity={0.5} style={viewStyle} {...rest}>
      {content}
    </TouchableOpacity>
  );
}
