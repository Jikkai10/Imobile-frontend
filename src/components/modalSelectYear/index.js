import React from 'react';
import {Modal, FlatList} from 'react-native';
import {Container, TextButtonYear, ButtonYear, TextConteiner, DescriptionYear} from './style';

export default function selectYear({
  setModalVisible,
  setData,
  minYear,
  maxYear,
  modalVisible,
}) {
    console.log(minYear);
  const anos = [];
  for (var i = minYear; i <= maxYear; i++) {
    anos.push({
      year: i.toString(),
      id: i.toString(),
    });
  }

  function RenderItem(props) {
    return (
      <ButtonYear
        onPress={() => {
          setData(parseInt(props.data.year));
          setModalVisible(false);
        }}>
        <TextButtonYear>{props.data.year}</TextButtonYear>
      </ButtonYear>
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
        <TextConteiner><DescriptionYear>Selecione um ano:</DescriptionYear></TextConteiner>
        <FlatList
          //contentContainerStyle={styles.list}
          data={anos}
          renderItem={({item}) => <RenderItem data={item} />}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          
        />
        
      </Container>
    </Modal>
  );
}
