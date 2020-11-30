import React from 'react';
import {Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';
import noWifi from '../../logo/noWifi.json';

import {Container, ContainerError, TextError} from './style';

function error() {
  return (
    <Container>
        <Lottie
            source={noWifi}
            resizeMode="contain"
            style={{width: 100, height: 100, }}
            loop
            autoPlay
        />
        <TextError>Informações não encontradas</TextError>
        <TextError>Verifique sua conexão</TextError>
    </Container>
  );
}

export default error;