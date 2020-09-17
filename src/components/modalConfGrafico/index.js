import React, {useState, useEffect} from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Modal, View, StyleSheet} from 'react-native';
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
import {Modalize} from 'react-native-modalize';
import {
  Description,
  ModalContainer,
  ExitButton,
  TextExitButton,
} from '../../pages/pageRegionCap/style';

function modalConfGrafico({
  description,
  descriptionExtra,
  listaRecebida,
  setLista,
  visible,
}) {
  const lista = [...listaRecebida];
  const [isLast, setIsLast] = useState();
  const [isMax, setIsMax] = useState();
  const [isLastExtra, setIsLastExtra] = useState();
  const [showLastMensag, setShowLastMensag] = useState(false);
  const [aviso, setAviso] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowLastMensag(false);
    }, 5000);
  }, [showLastMensag]);
  return (
    <>
      <Modalize
        ref={visible}
        withHandle={false}
        modalStyle={{backgroundColor: null}}
        useNativeDriver
        //onOpen={()=>}
        withReactModal
        onClosed={() => {
          setLista(lista);
          setOpen(!open);
        }}>
        <ModalContainer style={{maxHeight: 300}}>
          <Container showsVerticalScrollIndicator={false}>
            {description.map((item, index) => {
              const [checked, setChecked] = useState(false);
              const [quant, setQuant] = useState();
              const height = useSharedValue(0);
              const opacity = useSharedValue(0);
              const ContainerStyle = useAnimatedStyle(() => {
                return {
                  height: height.value,
                };
              });
              useEffect(() => {
                setChecked(false);
              }, [open]);

              useEffect(() => {
                if (checked) {
                  height.value = withTiming(
                    30 * lista[index].length,
                    {
                      duration: 1000,
                    },
                    () => {
                      let quantLista = 0;
                      lista[index].forEach((item) => {
                        if (item) {
                          quantLista += 1;
                        }
                      });
                      setQuant(quantLista);
                    },
                  );
                  opacity.value = withTiming(1, {
                    duration: 2000,
                  });
                } else {
                  height.value = withTiming(0, {
                    duration: 1000,
                  });
                  opacity.value = withTiming(
                    0,
                    {
                      duration: 1000,
                    },
                    () => {
                      let quantLista = 0;
                      lista[index].forEach((item) => {
                        if (item) {
                          quantLista += 1;
                        }
                      });
                      setQuant(quantLista);
                    },
                  );
                }
              }, [checked]);

              return (
                <>
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
                    {descriptionExtra[index].map((item, indexExtra) => {
                      let key = indexExtra;
                      const [checkedExtra, setCheckedExtra] = useState(
                        lista[index][indexExtra],
                      );
                      const ItensStyle = useAnimatedStyle(() => {
                        return {
                          opacity: opacity.value,
                        };
                      });

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
                          style={[
                            {
                              height: 30,

                              flex: 1,
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
                    })}
                  </Animated.View>
                </>
              );
            })}
          </Container>
          <ExitButton
            onPress={() => {
              visible.current?.close();
            }}>
            <TextExitButton>OK</TextExitButton>
          </ExitButton>
        </ModalContainer>
      </Modalize>
      <Aviso
        visible={showLastMensag}
        setVisible={setShowLastMensag}
        aviso={aviso}
      />
    </>
  );
}

export default modalConfGrafico;
