import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import { YellowBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useHeaderHeight} from '@react-navigation/stack';
import Modal from 'react-native-modal';
import {Modalize} from 'react-native-modalize';

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

  const minYearRef = useRef(null);
  const maxYearRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ConfiguracaoHeader style={{height: height}} onPress={onOpen}>
          <Icon name="cog" size={25} color="#fff" />
        </ConfiguracaoHeader>
      ),
    });
  }, [navigation]);
  
  console.disableYellowBox = true;
  const visibleRef = useRef(null);

  function onOpen() {
    visibleRef.current?.open();
  }

  function onClose() {
    visibleRef.current?.close();
  }

  return (
    <>
      
      <Modalize
        /*style={{flex:1,margin:0,justifyContent:'flex-start'}}
        useNativeDriver={true}   
        
        visible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(!isModalVisible)}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
          //Alert.alert('Modal has been closed.');
        }}*/
        ref={visibleRef}
        withHandle={false}
        modalStyle={{backgroundColor: null,zIndex: 10,elevation: 2}}
        onClosed={() => {
          setIsSale(vendaOuAluguel);
          setFirstYear(minYear);
          setLastYear(maxYear);
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
                minYearRef.current?.open();
                //setModalMinYearVisible(!modalMinYearVisible);
              }}>
              <TextYear>{minYear}</TextYear>
            </YearButton>

            <TextYear> até </TextYear>
            <YearButton
              onPress={() => {
                maxYearRef.current?.open();
              }}>
              <TextYear>{maxYear}</TextYear>
            </YearButton>
           
          </ConteinerSelectYear>
          <ExitButton
            onPress={() => {
              visibleRef.current.close();
            }}>
            <TextExitButton>OK</TextExitButton>
          </ExitButton>
        </ModalContainer>
      </Modalize>
      <ModalYear
        modalVisible={minYearRef}
        data={minYear}
        setData={setMinYear}
        minYear={2010}
        maxYear={maxYear - 1}
      />
      <ModalYear
        modalVisible={maxYearRef}
        data={maxYear}
        setData={setMaxYear}
        minYear={minYear + 1}
        maxYear={2020}
      />
      <Tab.Navigator
        initialRouteName="Capital"
        lazy
        removeClippedSubviews
        tabBarOptions={{
          activeTintColor: '#fff',
          showIcon: true,

          labelStyle: {fontSize: 13},
          indicatorStyle: {backgroundColor: '#fff'},
          tabStyle: {flex: 1, flexDirection: 'row'},
          style: {backgroundColor: '#13131a'},
        }}>
        <Tab.Screen
          name="Capital"
          key="Capital"
          options={{
            tabBarIcon: ({focused}) => (
              <IconImage
                style={{opacity: focused ? 1 : 0.5, tintColor: '#fff'}}
                source={require('../../logo/brasil.png')}
              />
            ),
          }}
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
          key="Regioes"
          options={{
            tabBarIcon: ({focused}) => (
              <IconImage
                style={{opacity: focused ? 1 : 0.5, tintColor: '#fff'}}
                source={require('../../logo/placeholder.png')}
              />
            ),
          }}
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
