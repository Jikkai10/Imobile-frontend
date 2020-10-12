import React, {useEffect,useState} from 'react';
import {Modal, FlatList, Dimensions, StyleSheet} from 'react-native';
import {
  Container,
  TextButton,
  ButtonRegion,
  TextConteiner,
  Description,
} from './style';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

export default function selectRegion({
  setRegion,
  region,
  lista,
  modalVisible,
  setModalVisible,
}) {
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
      <ButtonRegion
        onPress={() => {
          setRegion({value: props.data.value, name: props.data.nome});
          position.value = withTiming(
            Dimensions.get('window').height,
            {
              duration: 500,
            },
            () => {
              setModalVisible(false);
            },
          );
        }}>
        <TextButton>{props.data.nome}</TextButton>
      </ButtonRegion>
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
      <Animated.View style={[style.container,ContainerStyle]}>
        <TextConteiner><Description>Selecione uma região</Description></TextConteiner>
        <FlatList
          data={lista}
          renderItem={({item}) => <RenderItem data={item} />}
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
    width: Dimensions.get('window').width * 0.55,
    maxHeight: 200,
    alignSelf: 'center',
    marginTop: 7,
    elevation: 5,
  },
});
