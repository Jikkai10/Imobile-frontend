import React from 'react';
import {Modal} from 'react-native';

import {Container, ModalContainer, Description} from './styles';

const modalAviso = ({aviso, visible, setVisible}) => {
   
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={() => {
        setVisible(!visible);
        //Alert.alert('Modal has been closed.');
      }}>
      <Container>
        <ModalContainer>
          <Description>{aviso}</Description>
        </ModalContainer>
      </Container>
    </Modal>
  );
};

export default modalAviso;
