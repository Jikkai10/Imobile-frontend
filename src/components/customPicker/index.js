import React, {useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {Container, ContainerOptions, Title} from './styles';
export default function customPicker({label, data, currentIndex, onSelected}) {
  const buttonRef = useRef(null);
  return (
    <Container>
      <Title>{label}</Title>
      <ContainerOptions>
        <FlatList
          bounces
          horizontal
          data={data}
          keyExtractor={(item, idx) => String(item)}
          renderItem={({item, index}) => {
            const selected = index === currentIndex;
            
            return (
              <TouchableWithoutFeedback
                ref={buttonRef}
                onPress={() => {
                  
                  return onSelected(index);
                }}>
                <View
                  style={[
                    styles.itemStyleHorizontal,
                    selected && styles.itemSelectedStyleHorizontal,
                  ]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: selected ? '#fff' : '#aaa',
                      fontWeight: selected ? 'bold' : 'normal',
                    }}>
                    {item + ''}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </ContainerOptions>
    </Container>
  );
}

const styles = StyleSheet.create({
  itemStyleHorizontal: {
    marginRight: 5,
    height: 25,
    padding: 5,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 25,
    textAlign: 'center',
    justifyContent: 'center',
  },
  itemSelectedStyleHorizontal: {
    borderWidth: 2,
    borderColor: '#fff',
  },
});
