import React, {useState, useEffect, useLayoutEffect} from 'react';
import {} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useHeaderHeight} from '@react-navigation/stack';
import Modal from 'react-native-modal';

import {
  ModalContainer,
  ExitButton,
  TextExitButton,
  ConfiguracaoHeader,
  ConteinerSelectYear,
  YearButton,
  TextYear,
  Icon as IconImage,
} from './style';
import CustomPicker from '../../components/customPicker';
import Regions from './regions';
import Capital from './capital';
import ModalYear from '../../components/modalSelectYear';

const Tab = createMaterialTopTabNavigator();

const a = ['Região A', 'Região B', 'Região C', 'Região D', 'Região E'];
export default function valorizacao({navigation, route}) {
  const height = useHeaderHeight() * 0.8;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vendaOuAluguel, setVendaOuAluguel] = useState(0);

  const [isSale, setIsSale] = useState(0);
  const [lastYear, setLastYear] = useState(2020);
  const [firstYear, setFirstYear] = useState(2018);

  const [modalMinYearVisible, setModalMinYearVisible] = useState(false);
  const [modalMaxYearVisible, setModalMaxYearVisible] = useState(false);
  const [minYear, setMinYear] = useState(2018);
  const [maxYear, setMaxYear] = useState(2020);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ConfiguracaoHeader
          style={{height: height}}
          onPress={() => setIsModalVisible(true)}>
          <Icon name="cog" size={25} color="#fff" />
        </ConfiguracaoHeader>
      ),
    });
  }, [navigation]);

  

  return (
    <>
      <Modal
        style={{flex:1,margin:0,justifyContent:'flex-start'}}
        useNativeDriver={true}   
        visible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(!isModalVisible)}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
          //Alert.alert('Modal has been closed.');
        }}>
        <ModalContainer>
          <CustomPicker
            label="Dados a serem mostrados:"
            data={['venda', 'aluguel']}
            currentIndex={vendaOuAluguel}
            onSelected={setVendaOuAluguel}
          />
          <ConteinerSelectYear>
            <TextYear>Mostrar dados de </TextYear>
            <YearButton
              onPress={() => {
                setModalMinYearVisible(!modalMinYearVisible);
              }}>
              <TextYear>{minYear}</TextYear>
            </YearButton>
            <ModalYear
              modalVisible={modalMinYearVisible}
              setModalVisible={setModalMinYearVisible}
              setData={setMinYear}
              minYear={2010}
              maxYear={maxYear - 1}
            />
            <TextYear> até </TextYear>
            <YearButton
              onPress={() => {
                setModalMaxYearVisible(!modalMaxYearVisible);
              }}>
              <TextYear>{maxYear}</TextYear>
            </YearButton>
            <ModalYear
              modalVisible={modalMaxYearVisible}
              setModalVisible={setModalMaxYearVisible}
              setData={setMaxYear}
              minYear={minYear + 1}
              maxYear={2020}
            />
          </ConteinerSelectYear>
          <ExitButton
            onPress={() => {
              setIsModalVisible(false);
              setIsSale(vendaOuAluguel);
              setFirstYear(minYear);
              setLastYear(maxYear);
            }}>
            <TextExitButton>OK</TextExitButton>
          </ExitButton>
        </ModalContainer>
      </Modal>
      <Tab.Navigator
        initialRouteName="Capital"
        lazy
        
        removeClippedSubviews
        tabBarOptions={{
          activeTintColor: '#000',
          showIcon: true,
          
          labelStyle: {fontSize: 13},
          indicatorStyle: {backgroundColor: '#000'},
          tabStyle: {flex: 1,flexDirection: 'row'},
          style: {backgroundColor: '#fff'},
        }}>
        <Tab.Screen
          name="Capital"
          key="Capital"
          options={{tabBarIcon: ({focused}) => <IconImage style={{opacity: focused ? 1 : 0.5}} source={require('../../logo/brasil.png')}/>}}
          children={() => (
            <Capital
              isSale={isSale}
              firstYear={firstYear}
              lastYear={lastYear}
            />
          )}
        />

        <Tab.Screen
          name="Regiões"
          key='Regioes'
          options={{tabBarIcon: ({focused}) => <IconImage style={{opacity: focused ? 1 : 0.5}} source={require('../../logo/placeholder.png')}/>}}
          children={() => (
            <Regions
              isSale={isSale}
              firstYear={firstYear}
              lastYear={lastYear}
            />
          )}
        />
      </Tab.Navigator>
    </>
  );
}
