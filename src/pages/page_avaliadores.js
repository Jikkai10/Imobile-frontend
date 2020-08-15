import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const Avaliadores = () => (
  <View style={styles.container}>
    <Text>Avaliadores</Text>
  </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
});

export default Avaliadores;