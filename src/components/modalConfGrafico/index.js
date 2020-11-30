import React, {useState, useEffect} from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Modal, View, StyleSheet, FlatList, Dimensions} from 'react-native';
//import Modal from 'react-native-modal';
import {
  RadioButtonContainer,
  InfoExtra,
  Container,
  ContainerRadio,
} from './styles';
import RadioButton from '../RadioButton';
import ArrowButton from '../arrowButton';
import Aviso from '../modalAviso';

import {
  Description,
  ModalContainer,
  ExitButton,
  TextExitButton,
} from '../../pages/pageRegionCap/style';
import {ContainerList} from '../../pages/pageMain/styles';

function renderItem({item, index}) {}

function modalConfGrafico({
  description,
  descriptionExtra,
  listaRecebida,
  setVisible,
  setLista,
  visible,
}) {
  const lista = [...listaRecebida];

  const positionModal = useSharedValue(Dimensions.get('window').height);
  useEffect(() => {
    if (visible) {
      positionModal.value = withTiming(0, {
        duration: 500,
      });
    }
  }, [visible]);

  const ContainerModalStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: positionModal.value,
        },
      ],
    };
  });

  function RenderItem({item, index}) {
    const [checked, setChecked] = useState(false);
    const [quant, setQuant] = useState(0);
    const height = useSharedValue(0);

    const [isMax, setIsMax] = useState();
    const [isLastExtra, setIsLastExtra] = useState();
    const [showLastMensag, setShowLastMensag] = useState(false);
    const [aviso, setAviso] = useState();

    useEffect(() => {
      setTimeout(() => {
        setShowLastMensag(false);
      }, 3000);
    }, [showLastMensag]);
    const ContainerStyle = useAnimatedStyle(() => {
      return {
        height: height.value,
      };
    });

    useEffect(() => {
      let quantLista = 0;
      lista[index].forEach((item) => {
        if (item) {
          quantLista += 1;
        }
      });
      setQuant(quantLista);
      if (checked) {
        height.value = withTiming(30 * lista[index].length, {
          duration: 1000,
        });
      } else {
        height.value = withTiming(0, {
          duration: 1000,
        });
      }
    }, [checked]);

    return (
      <View key={index}>
        <RadioButtonContainer onPress={() => setChecked(!checked)}>
          <ArrowButton checked={checked} setChecked={setChecked} />
          <Description> {item} </Description>
          {!checked && quant === 1 ? (
            <Description
              style={{
                opacity: 0.75,
                fontSize: 12,
                marginLeft: 2,
                marginTop: 2,
              }}>
              {quant} item selec.
            </Description>
          ) : !checked && quant !== 1 ? (
            <Description
              style={{
                opacity: 0.75,
                fontSize: 12,
                marginLeft: 2,
                marginTop: 2,
              }}>
              {quant} itens selec.
            </Description>
          ) : null}
        </RadioButtonContainer>

        <Animated.View style={[{marginLeft: 10}, ContainerStyle]}>
          <FlatList
            data={descriptionExtra[index]}
            scrollEnabled={false}
            renderItem={(props) => (
              <RenderItemExtra
                setAviso={setAviso}
                setIsMax={setIsMax}
                isMax={isMax}
                setShowLastMensag={setShowLastMensag}
                isLastExtra={isLastExtra}
                setIsLastExtra={setIsLastExtra}
                item={props.item}
                checked={checked}
                indexExtra={props.index}
                index={index}
              />
            )}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
        <Aviso
          visible={showLastMensag}
          setVisible={setShowLastMensag}
          aviso={aviso}
        />
      </View>
    );
  }

  function RenderItemExtra({
    item,
    index,
    setShowLastMensag,
    indexExtra,
    checked,
    setAviso,
    setIsLastExtra,
    isLastExtra,
    isMax,
    setIsMax,
  }) {
    const [checkedExtra, setCheckedExtra] = useState(lista[index][indexExtra]);
    const opacity = useSharedValue(0);
    const ItensStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      };
    });
    useEffect(() => {
      if (checked) {
        opacity.value = withTiming(1, {
          duration: 2000,
        });
      } else {
        opacity.value = withTiming(0, {
          duration: 1000,
        });
      }
    }, [checked]);

    useEffect(() => {
      lista[index][indexExtra] = checkedExtra;
      let quantLista = 0;
      lista.forEach((item) =>
        item.forEach((value) => {
          if (value) {
            quantLista += 1;
          }
        }),
      );
      if (quantLista === 1) {
        setAviso('Precisa manter 1 item selecionado');
        setIsLastExtra(true);
      } else if (quantLista === 6) {
        setAviso('Atingiu o máximo de itens selecionados');
        setIsMax(true);
      } else {
        setIsLastExtra(false);
        setIsMax(false);
      }
    }, [checkedExtra]);
    return (
      <Animated.View
        key={indexExtra}
        style={[
          {
            height: 30,
            //flex: 1,
          },
          ItensStyle,
        ]}>
        <ContainerRadio
          onPress={() => {
            if (!isLastExtra && !isMax) {
              setCheckedExtra(!checkedExtra);
            } else if (
              (isLastExtra && checkedExtra) ||
              (isMax && !checkedExtra)
            ) {
              setShowLastMensag(true);
            } else {
              setCheckedExtra(!checkedExtra);
            }
          }}>
          <RadioButton
            checked={checkedExtra}
            setChecked={setCheckedExtra}
            setShowLastMensag={setShowLastMensag}
            last={isLastExtra}
            max={isMax}
          />
          <Description> {item} </Description>
        </ContainerRadio>
      </Animated.View>
    );
  }

  return (
    <>
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <Animated.View style={[style.modalContainer, ContainerModalStyle]}>
          <FlatList
            data={description}
            renderItem={({item, index}) => (
              <RenderItem item={item} index={index} />
            )}
            enableEmptySections={true}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
          />
          <ExitButton
            onPress={() => {
              
              positionModal.value = withTiming(
                Dimensions.get('window').height,
                {
                  duration: 500,
                },
                () => {
                  setVisible(false);
                  setLista(lista);
                },
              );
            }}>
            <TextExitButton>OK</TextExitButton>
          </ExitButton>
        </Animated.View>
      </Modal>
    </>
  );
}

const style = StyleSheet.create({
  modalContainer: {
    margin: 5,
    backgroundColor: '#13131a',
    borderRadius: 20,
    maxHeight: 300,
    padding: 20,
    alignItems: 'flex-start',
  },
});

export default modalConfGrafico;
