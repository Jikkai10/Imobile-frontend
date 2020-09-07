import React from 'react';
import {Modal, FlatList} from 'react-native';
import {Container, TextButtonYear, ButtonYear, TextConteiner, DescriptionYear} from './style';
import {Modalize} from 'react-native-modalize';
export default function selectYear({
  setData,
  data,
  minYear,
  maxYear,
  modalVisible,
}) {
  let value = data;
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
          value = props.data.year;
          modalVisible.current?.close();
        }}>
        <TextButtonYear>{props.data.year}</TextButtonYear>
      </ButtonYear>
    );
  }
  return (
    <Modalize
      /*animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
        //Alert.alert('Modal has been closed.');
      }}*/ 
      ref={modalVisible}
      disableScrollIfPossible
      onClosed={()=>setData(parseInt(value))}
      panGestureEnabled={false}
      withHandle={false}
      
      modalStyle={{backgroundColor: null}}
      //withReactModal
      >
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
    </Modalize>
  );
}
