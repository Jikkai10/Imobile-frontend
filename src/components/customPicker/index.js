import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
export default function customPicker({label, data, currentIndex, onSelected}) {
  return (
    <>
      <Text style={styles.title}>{label}</Text>
      <View style={styles.wrapperHorizontal}>
        <FlatList
          bounces
          horizontal
          data={data}
          keyExtractor={(item, idx) => String(item)}
          renderItem={({item, index}) => {
            const selected = index === currentIndex;
            return (
              <TouchableWithoutFeedback onPress={() => onSelected(index)}>
                <View
                  style={[
                    styles.itemStyleHorizontal,
                    selected && styles.itemSelectedStyleHorizontal,
                  ]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: selected ? 'black' : 'grey',
                      fontWeight: selected ? 'bold' : 'normal',
                    }}>
                    {item + ''}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapperHorizontal: {
    height: 54,
    justifyContent: 'center',
    color: 'black',
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 4,
  },
  itemStyleHorizontal: {
    marginRight: 10,
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 25,
    textAlign: 'center',
    justifyContent: 'center',
  },
  itemSelectedStyleHorizontal: {
    borderWidth: 2,
    borderColor: '#00f',
  },
});
