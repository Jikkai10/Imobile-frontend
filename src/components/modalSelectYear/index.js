import React, {useState, useEffect} from 'react';
import {Modal, FlatList, Dimensions, StyleSheet, View} from 'react-native';
import {
  Container,
  TextButtonYear,
  ButtonYear,
  TextConteiner,
  DescriptionYear,
} from './style';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {Description} from '../modalAviso/styles';
import modal from '../modalGrafico';
export default function selectYear({
  setData,
  data,
  minYear,
  maxYear,
  modalVisible,
  setModalVisible,
}) {
  const anos = [];
  for (var i = minYear; i <= maxYear; i++) {
    anos.push({
      year: i.toString(),
      id: i.toString(),
    });
  }
  const position = useSharedValue(Dimensions.get('window').height);
  useEffect(() => {
    if (modalVisible) {
      position.value = withTiming(0, {
        duration: 500,
      });
    }
  }, [modalVisible]);

  const ContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: position.value,
        },
      ],
    };
  });
  function RenderItem(props) {
    return (
      <ButtonYear
        onPress={() => {
          setData(parseInt(props.data.year));
          position.value = withTiming(Dimensions.get('window').height, {
            duration: 500,
          },()=>{
            setModalVisible(false);
          });
          //setModalVisible(false);
        }}>
        <TextButtonYear>{props.data.year}</TextButtonYear>
      </ButtonYear>
    );
  }
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <Animated.View style={[style.container, ContainerStyle]}>
        <TextConteiner>
          <Description>Selecione um ano:</Description>
        </TextConteiner>
        <FlatList
          data={anos}
          renderItem={({item, index}) => <RenderItem data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </Modal>
  );
}

const style = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: '#13131a',
    borderRadius: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
    width: Dimensions.get('window').width * 0.5,
    maxHeight: 200,
    alignSelf: 'center',
    marginTop: 7,
    elevation: 5,
  },
});
