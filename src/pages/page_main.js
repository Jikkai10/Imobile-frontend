import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class Main extends Component {
  render() {
    return (
      <View style={styles.conteiner}>
        <TouchableOpacity
          style={styles.productButton}
          onPress={() => this.props.navigation.navigate('login')}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.productButton}
          onPress={() => this.props.navigation.navigate('avaliadores')}>
          <Text style={styles.text}>Avaliadores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.productButton}
          onPress={() => this.props.navigation.navigate('bairros')}>
          <Text style={styles.text}>Valorização</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.productButton}
          onPress={() => this.props.navigation.navigate('mapa')}>
          <Text style={styles.text}>Mapa</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  conteiner: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },

  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    margin: 10,
  },
});
