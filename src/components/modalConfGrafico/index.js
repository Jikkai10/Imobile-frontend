import React, {useState, useEffect} from 'react';
import {Modal,View} from 'react-native';
//import Modal from 'react-native-modal';
import {RadioButtonContainer, InfoExtra, Container} from './styles';
import RadioButton from '../RadioButton';
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
  const [isLastExtra, setIsLastExtra] = useState();
  const [showLastMensag, setShowLastMensag] = useState(false);
  const [aviso, setAviso] = useState();
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
        withReactModal
        onClosed={() => setLista(lista)}>
        <ModalContainer style={{maxHeight: 300}}>
          <Container showsVerticalScrollIndicator={false}>
            {description.map((item, index) => {
              const [checked, setChecked] = useState(lista[index][0]);

              return (
                <>
                  <RadioButtonContainer>
                    <RadioButton
                      checked={checked}
                      setChecked={setChecked}
                      setShowLastMensag={setShowLastMensag}
                      last={isLast}
                    />
                    <Description> {item} </Description>
                  </RadioButtonContainer>

                  <InfoExtra>
                    {descriptionExtra[index].map((item, indexExtra) => {
                      const [checkedExtra, setCheckedExtra] = useState(
                        lista[index][indexExtra],
                      );
                      useEffect(() => {
                        if (checked) {
                          lista[index][0] = checked;
                          if (indexExtra === 0) {
                            setCheckedExtra(checked);
                          }
                        } else {
                          lista[index] = lista[index].map(
                            (item, index) => false,
                          );
                          setCheckedExtra(checked);
                        }
                        let quantLista = 0;
                        lista.forEach((item) => {
                          let quant = 0;

                          item.forEach((value) => {
                            if (value) {
                              quant += 1;
                            }
                          });
                          if (quant !== 0) {
                            quantLista += 1;
                          }
                        });

                        if (quantLista === 1) {
                          setIsLast(true);
                          setAviso("Precisa manter 1 item selecionado");
                        } else {
                          setIsLast(false);
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
                          setAviso("Precisa manter 1 item selecionado");
                          setIsLastExtra(true);
                          
                        } else if(quantLista === 6) {
                          setAviso("Atingiu o máximo de itens selecionados");
                          setIsLastExtra(true);
                          
                        } else {
                          setIsLastExtra(false);
                        }
                      }, [checkedExtra]);
                      return checked ? (
                        <RadioButtonContainer>
                          <RadioButton
                            checked={checkedExtra}
                            setChecked={setCheckedExtra}
                            setShowLastMensag={setShowLastMensag}
                            last={isLastExtra}
                          />
                          <Description> {item} </Description>
                        </RadioButtonContainer>
                      ) : null;
                    })}
                  </InfoExtra>
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
      <Aviso visible={showLastMensag} setVisible={setShowLastMensag} aviso={aviso} />
    </>
  );
}

export default modalConfGrafico;
