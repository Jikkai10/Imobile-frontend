import React from 'react';
import {Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';
import Loading from '../../logo/4389-pt-white-house.json';
import Loading2 from '../../logo/lf30_editor_xDVmOu.json';

import {Container, Containerloading, TextLoading} from './styles';

function loading() {
  return (
    <Container>
      <Lottie
        source={Loading}
        resizeMode="contain"
        style={{width: 200, height: 200}}
        loop
        autoPlay
      />
      <Containerloading>
          <TextLoading>Carregando</TextLoading>
          <Lottie
            source={Loading2}
            resizeMode="contain"
            style={{width: 16, height: 16, marginTop: 4}}
            loop
            autoPlay
          />
      </Containerloading>
    </Container>
  );
}

export default loading;
