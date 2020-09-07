import React from 'react';
import {View} from 'react-native';

import {Container, ContainerTipo, ContainerValue, TextTipo, TextValue, Bola, ContainerWrap} from './styles';

function legenda({values, valuesTipo}) {
  
  return (
    <Container>
      {values.map((item, index) => (item.length !== 0) ? (
        <ContainerTipo>
          <TextTipo>{valuesTipo[index]}</TextTipo>
          <ContainerWrap>
          {item.map((value, index) => (
            <ContainerValue>
              <Bola style={{backgroundColor: value.color }}/>
              <TextValue>{value.value}</TextValue>
            </ContainerValue>
          ))}
          </ContainerWrap>
        </ContainerTipo>
      ):null)}
    </Container>
  );
}

export default legenda;
