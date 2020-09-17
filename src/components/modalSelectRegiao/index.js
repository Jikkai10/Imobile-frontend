import React from 'react';
import {Modal, FlatList,Dimensions} from 'react-native';
import {
  Container,
  TextButton,
  ButtonRegion,
  TextConteiner,
  Description,
} from './style';
import {Modalize} from 'react-native-modalize';

export default function selectRegion({
  setRegion,
  lista,
  modalVisible,
}) {
  let value;
  function RenderItem(props) {
    return (
      <ButtonRegion
        onPress={() => {
          
          value = {value: props.data.value, name: props.data.nome};
          modalVisible.current?.close();
        }}>
        <TextButton>{props.data.nome}</TextButton>
      </ButtonRegion>
    );
  }
  return (
    <Modalize
      ref={modalVisible}
      disableScrollIfPossible
      withReactModal
      modalTopOffset={20}
      //modalHeight={}
      
      onClosed={() => setRegion(value)}
      panGestureEnabled={false}
      withHandle={false}
      modalStyle={{backgroundColor: null}}>
      <Container>
        <TextConteiner>
          <Description>Selecione uma região:</Description>
        </TextConteiner>
        <FlatList
          //contentContainerStyle={styles.list}
          data={lista}
          renderItem={({item}) => <RenderItem data={item} />}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    </Modalize>
  );
}
