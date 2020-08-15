import React, {useState} from 'react';
import {Modal, TouchableHighlight, View, Text, StyleSheet} from 'react-native';
import BairroList from '../lista_bairro';

export default function ModalComparacao({
  setBairro,
  setModalVisibleComp,
  modalVisibleComp,
}) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleComp}
        onRequestClose={() => {
          setModalVisibleComp(false);
          //Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.modalView}>
          <View style={{flex: 1}}>
            <BairroList
              modalVisibleComp={modalVisibleComp}
              setModalVisibleComp={setModalVisibleComp}
              setBairro={setBairro}
            />
          </View>
          <View style={{marginTop: 60, justifyContent: 'center'}}>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                setModalVisibleComp(!modalVisibleComp);
              }}>
              <Text style={{color: '#00f'}}>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisibleComp(true);
        }}>
        <Text style={{color: '#00f'}}>Comparar com outra região</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
});
