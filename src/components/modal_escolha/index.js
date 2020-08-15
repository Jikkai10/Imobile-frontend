import React, {useState} from 'react';
import {Modal, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BairroList from '../lista_bairro';

export default function ModalEscolha({
  setBairro,
  bairro,
  modalVisibleComp,
  setModalVisibleComp,
  setVoltaBairro
}) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleComp}
        onRequestClose={() => {
          setModalVisibleComp(!modalVisibleComp);
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.modalView}>
          <View style={{flex: 1}}>
            <BairroList
              modalVisibleComp={modalVisibleComp}
              setModalVisibleComp={setModalVisibleComp}
              setBairro={setBairro}
              bairroAtual={bairro}
              setVoltaBairro={setVoltaBairro}
            />
          </View>
          <View style={{marginTop: 60, justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                borderRadius: 100,
                backgroundColor: '#000',
                padding: 6,
                elevation: 5,
              }}
              onPress={() => {
                setModalVisibleComp(!modalVisibleComp);
              }}>
              <Text style={{color: '#fff'}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.ViewButton}>
          <View style={{flex: 1, height: 27}}>
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                setModalVisibleComp(true);
              }}>
              <Text
                style={{
                  color: '#000',
                  //fontWeight: 'bold',
                  marginLeft: 5,
                  fontSize: 20,
                }}>
                {bairro}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
            }}>
            <Icon.Button
              name="search-location"
              style={{
                height: 27,
                borderColor: '#000',
                borderWidth: 1,
              }}
              size={15}
              color="#000"
              backgroundColor="#fff"
              borderRadius={0}
              onPress={() => setModalVisibleComp(true)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    //marginLeft: 5,
    borderColor: '#000',
    borderWidth: 1,
    flex: 1,
  },
  ViewButton: {
    backgroundColor: '#fff',

    flex: 1,
    flexDirection: 'row',
  },
  openButtonSearch: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
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
