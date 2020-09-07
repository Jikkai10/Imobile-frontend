import React from 'react';
import {Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';
import Loading from '../../logo/casaBranca.json';
import Loading2 from '../../logo/quadradinhos.json';

import {Container, Containerloading, TextLoading} from './styles';

function loading() {
  return (
    <Container>
      <Lottie
        source={Loading}
        resizeMode="contain"
        style={{width: 200, height: 200, }}
        loop
        autoPlay
      />
      <Containerloading>
          <TextLoading>Carregando</TextLoading>
          <Lottie
            source={Loading2}
            resizeMode="contain"
            style={{width: 23, height: 23, marginTop: 2}}
            loop
            autoPlay
          />
      </Containerloading>
    </Container>
  );
}

export default loading;
