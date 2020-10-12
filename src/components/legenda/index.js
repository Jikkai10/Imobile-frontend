import React from 'react';
import {View} from 'react-native';

import {Container, ContainerTipo, ContainerValue, TextTipo, TextValue, Bola, ContainerWrap} from './styles';

function legenda({values, valuesTipo}) {
  
  return (
    <Container>
      {values.map((item, index) => (item.length !== 0) ? (
        <ContainerTipo key={index}>
          <TextTipo>{valuesTipo[index]}</TextTipo>
          <ContainerWrap>
          {item.map((value, index) => (
            <ContainerValue key={index}>
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
