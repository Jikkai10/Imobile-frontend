import React, {useState, useEffect} from 'react';
import Grafico from '../../components/grafico';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { Container, ModalContainer, ExitButton, TextExitButton, Description } from './style';

export default function valorizacao({navigation, route}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon.Button
          name="cog"
          size={25}
          color="#fff"
          backgroundColor="#111111"
          borderRadius={100}
          onPress={() => setModalVisible(true)}
        />
      ),
    });
  }, [navigation]);

  const [modalVisible,setModalVisible] = useState(false);

  return (
    <Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            //Alert.alert('Modal has been closed.');
          }}>
          <ModalContainer>
            
            <ExitButton
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <TextExitButton>OK</TextExitButton>
            </ExitButton>
          </ModalContainer>
        </Modal>
        <Description>Indices:</Description>
    </Container>
  );
}


