import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useHeaderHeight} from '@react-navigation/stack';

import {
  ModalContainer,
  ExitButton,
  TextExitButton,
  ConfiguracaoHeader,
  ConteinerSelectYear,
  YearButton,
  TextYear,
} from './style';
import CustomPicker from '../../components/customPicker';
import Regions from './regions';
import Capital from './capital';
import ModalYear from '../../components/modalSelectYear';

const Tab = createMaterialTopTabNavigator();

const a = ['Região A', 'Região B', 'Região C', 'Região D', 'Região E'];
export default function valorizacao({navigation, route}) {
  const height = useHeaderHeight() * 0.8;
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vendaOuAluguel, setVendaOuAluguel] = useState(0);

  const [isSale,setIsSale] = useState(0);
  const [lastYear, setLastYear] = useState(2020);
  const [firstYear, setFirstYear] = useState(2018);

  const [modalMinYearVisible, setModalMinYearVisible] = useState(false);
  const [modalMaxYearVisible, setModalMaxYearVisible] = useState(false);
  const [minYear, setMinYear] = useState(2018);
  const [maxYear, setMaxYear] = useState(2020);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
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
                setModalMinYearVisible(true);
              }}>
              <TextYear>{minYear}</TextYear>
            </YearButton>
            <ModalYear 
              modalVisible={modalMinYearVisible} 
              setModalVisible={setModalMinYearVisible} 
              setData={setMinYear}
              minYear={2010}
              maxYear={maxYear-1}
            />
            <TextYear> até </TextYear>
            <YearButton
              onPress={() => {
                setModalMaxYearVisible(true);
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
        lazyPreloadDistance={1}
        tabBarOptions={{
          activeTintColor: '#000',
          labelStyle: {fontSize: 13},
          scrollEnabled: true,
          indicatorStyle: {backgroundColor: '#000'},
          tabStyle: {width: 100},
          style: {backgroundColor: '#fff'},
        }}>
        <Tab.Screen
          name="Capital"
          key="Capital"
          children={() => <Capital isSale={isSale} firstYear={firstYear} lastYear={lastYear} />}
        />
        {a.map((value, index) => {
          return (
            <Tab.Screen
              name={value}
              key={value}
              children={() => (
                <Regions regiao={value} isSale={isSale} firstYear={firstYear} lastYear={lastYear} />
              )}
            />
          );
        })}
      </Tab.Navigator>
    </>
  );
}
