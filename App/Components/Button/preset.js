import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export const viewPresets = {
  button: {
    ...style.base,
    backgroundColor: 'gray',
    padding: 15,
  },
  icon: {
    ...style.base,
    padding: 5,
    borderRadius: 15,
    width: 30,
    height: 30,
  },
};

export const textPresets = {
  button: {
    color: 'white',
  },
};
