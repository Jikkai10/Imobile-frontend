import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Header, Input, Item} from 'native-base';

export default function BairrosList({setBairro,setModalVisibleComp,bairroAtual,setVoltaBairro}) {
  const [value, onChangeText] = React.useState('');
  const bairro = [
    'Cancelli',
    'Canada',
    'Centro',
    'Floresta',
    'Cascavel Velho',
    '14 de Novembro',
    '14 Novembro',
    'Alto Alegre',
    'Brasilia',
    'Brazmadeira',
    'Cataratas',
  ];
  bairro.sort();
  const bairros = bairro.map((item, index) => {
    return {id: index.toString(), name: item};
  });

  const [text, setText] = useState('');
  const [list, setList] = useState('');
  const [itens, setItens] = useState('');

  useEffect(() => {
    setList(bairros);
    setItens(bairros);
  }, []);

  function SearchFilterFunction(text) {
    const filterList = itens.filter((item) => {
      const itemFilter = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const newText = text.toUpperCase();
      return itemFilter.indexOf(newText) > -1;
    });

    setList(filterList);
    setText(text);
  }

  function RenderItem(props) {
    return (
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          if(bairroAtual === props.data.name){
            setVoltaBairro(true);
          }
          setBairro(props.data.name);
          
          setModalVisibleComp(false);
        }}>
        <Text style={styles.text}>{props.data.name}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <>
      <View style={styles.containerSearch}>
        <TextInput
          style={styles.textInput}
          placeholder="Procurar bairro"
          onChangeText={(t) => SearchFilterFunction(t)}
          value={text}
        />
      </View>

      <View style={styles.containerList}>
        <FlatList
          //contentContainerStyle={styles.list}
          data={list}
          renderItem={({item}) => <RenderItem data={item} />}
          enableEmptySections={true}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerSearch: {
    flexDirection: 'row',
  },

  containerList: {
    justifyContent: 'center',
  },

  text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25,
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    minWidth: 100,
    margin: 10,
    fontSize: 18,
  },

  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    margin: 10,
    minWidth: 50,
  },
});
