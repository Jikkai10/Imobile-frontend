import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

export default function CustomMarker() {
  return (
    <Image
      style={styles.image}
      source={require('../../logo/slider-button.png')}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  circle1: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    position: 'absolute',
  },
  circle2: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: '#4eaa37',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 15,
    height: 15,
  },
});
