import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function Item({
  value,
  first,
  second,
  selecionados,
  setSelecionados,
  setLength,
}) {
  return (
    <View>
      <Text style={styles.active}>{value}</Text>
    </View>
  );

  function checkActive() {
    if (value >= first && value <= second) {
      let existe = selecionados.find((item) => item === value);
      if (existe === undefined) {
        selecionados.push(value);
        //setSelecionados(selecionados);
      }
      setLength(selecionados.length);
      return true;
    } else {
      if (selecionados.indexOf(value) != -1) {
        selecionados.splice(selecionados.indexOf(value), 1);
      }
      setLength(selecionados.length);
      return false;
    }
  }
}

const styles = StyleSheet.create({
  active: {
    textAlign: 'center',
    fontSize: 10,
    bottom: 1,
    //marginHorizontal: 5,
    color: '#fff',
    fontFamily: 'Rex Bold',
  },
  inactive: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'normal',
    bottom: 1,
    fontSize: 10,
    color: '#bdc3c7',
  },
  line: {
    fontSize: 5,
    //marginRight: 2,
    textAlign: 'center',
  },
});
