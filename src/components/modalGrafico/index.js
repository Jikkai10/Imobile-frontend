import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {Container,ConteinerModal,TextModal} from './style';

export default function modal({
  ano,
  valor = 0,
  setModalVisible,
  modalVisible,
  color,
  sufixo,
}) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          //Alert.alert('Modal has been closed.');
        }}>
        <Container
          style={{flex: 1}}
          onPressOut={() => setModalVisible(!modalVisible)}
          activeOpacity={0.9}>
            <ConteinerModal style={{borderColor: color}}>
              <TextModal>
                Ano: {ano}
              </TextModal>
              <TextModal>
                Valor: {valor===-100?("sem informação"):(valor.toFixed(2))}{valor===-100?null:(sufixo)}
              </TextModal>
            </ConteinerModal>
        </Container>
      </Modal>
    );
}


