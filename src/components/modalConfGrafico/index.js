import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {RadioButtonContainer, InfoExtra} from './styles';
import RadioButton from '../RadioButton';
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
  setVisible,
}) {
  const lista = [...listaRecebida];
  const [isLast,setIsLast] = useState();
  const [isLastExtra,setIsLastExtra] = useState();
  return (
    <Modal
      style={{flex: 1, margin: 0, justifyContent: 'flex-start'}}
      useNativeDriver={true}
      visible={visible}
      onBackdropPress={() => setIsModalVisible(!isModalVisible)}
      onRequestClose={() => {
        setVisible(!visible);
        //Alert.alert('Modal has been closed.');
      }}>
      <ModalContainer>
        {description.map((item, index) => {
          const [checked, setChecked] = useState(lista[index][0]);

          return (
            <>
              <RadioButtonContainer>
                <RadioButton checked={checked} setChecked={setChecked} last={isLast}/>
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
                      lista[index] = lista[index].map((item, index) => false);
                      setCheckedExtra(checked);
                    }
                    let quantLista = 0;
                    lista.forEach((item) =>{
                      let quant = 0;
                      
                      item.forEach((value) => {
                        if (value) {
                          quant += 1;
                        }
                      });
                      if(quant !== 0){
                        quantLista += 1;
                      }
                    });
                    if(quantLista === 1){
                      setIsLast(true);
                    }else{
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
                    if(quantLista === 1){
                      setIsLastExtra(true);
                    }else{
                      setIsLastExtra(false);
                    }
                  }, [checkedExtra]);
                  return checked ? (
                    <RadioButtonContainer>
                      <RadioButton
                        checked={checkedExtra}
                        setChecked={setCheckedExtra}
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
        <ExitButton
          onPress={() => {
            setVisible(!visible);
            setLista(lista);
          }}>
          <TextExitButton>OK</TextExitButton>
        </ExitButton>
      </ModalContainer>
    </Modal>
  );
}

export default modalConfGrafico;
