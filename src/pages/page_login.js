import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import MultiSlider from '../components/multiSlider';

const Login = () => (
  <View style={styles.container}>
    <Text>Login</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
