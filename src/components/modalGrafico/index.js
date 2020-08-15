import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

export default function modal({
  ano,
  valor,
  porcentagem,
  tipo,
  anoAnterior,
  setModalVisible,
  modalVisible,
  color,
}) {
  if (tipo === 1) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          //Alert.alert('Modal has been closed.');
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          onPressOut={() => setModalVisible(!modalVisible)}
          activeOpacity={0.9}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{...styles.modalView, borderColor: color}}>
              <Text style={{marginHorizontal: 20, marginTop: 10}}>
                Ano: {ano}
              </Text>
              <Text
                style={{
                  marginHorizontal: 20,
                  marginVertical: 10,
                  marginTop: 5,
                }}>
                Valor médio: {valor}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  } else if (tipo === 3) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          //Alert.alert('Modal has been closed.');
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          onPressOut={() => setModalVisible(!modalVisible)}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{...styles.modalView, borderColor: color}}>
              <Text style={{marginHorizontal: 20, marginTop: 10}}>
                Ano: {ano}
              </Text>
              <Text style={{marginHorizontal: 20, marginVertical: 5}}>
                Crescimento: {valor}
              </Text>
              <Text
                style={{
                  marginHorizontal: 20,
                  marginVertical: 10,
                  marginTop: 5,
                }}>
                Crescimento em relação a {anoAnterior}: {porcentagem}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  } else {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          //Alert.alert('Modal has been closed.');
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          onPressOut={() => setModalVisible(!modalVisible)}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{...styles.modalView, borderColor: color}}>
              <Text style={{marginHorizontal: 20, marginTop: 10}}>
                Ano: {ano}
              </Text>
              <Text
                style={{
                  marginHorizontal: 20,
                  marginVertical: 10,
                  marginTop: 5,
                }}>
                Crescimento: {valor}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 20,
    //padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
