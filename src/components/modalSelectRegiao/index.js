import React from 'react';
import {Modal, FlatList} from 'react-native';
import {Container, TextButton, ButtonRegion, TextConteiner, Description} from './style';

export default function selectRegion({
  setModalVisible,
  setRegion,
  lista,
  modalVisible,
}) {
  
  function RenderItem(props) {
    return (
      <ButtonRegion
        onPress={() => {
          setRegion({value: props.data.value, name: props.data.nome});
          setModalVisible(false);
        }}>
        <TextButton>{props.data.nome}</TextButton>
      </ButtonRegion>
    );
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
        //Alert.alert('Modal has been closed.');
      }}>
      <Container>
        <TextConteiner><Description>Selecione uma região:</Description></TextConteiner>
        <FlatList
          //contentContainerStyle={styles.list}
          data={lista}
          renderItem={({item}) => <RenderItem data={item} />}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          
        />
        
      </Container>
    </Modal>
  );
}