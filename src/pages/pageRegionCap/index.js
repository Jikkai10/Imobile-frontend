import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useHeaderHeight} from '@react-navigation/stack';

import {ModalContainer,ExitButton,TextExitButton,ConfiguracaoHeader} from './style';
import CustomPicker from '../../components/customPicker';
import Regions from './regions';
import Capital from './capital';

const Tab = createMaterialTopTabNavigator();

const a = ['Região A', 'Região B', 'Região C', 'Região D', 'Região E'];
export default function valorizacao({navigation, route}) {

  const height = useHeaderHeight()*0.8;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ConfiguracaoHeader style={{height: height}} onPress={()=>setIsModalVisible(true)}>
          <Icon
            name="cog"
            size={25}
            color="#fff"
          />
        </ConfiguracaoHeader>
      ),
    });
  }, [navigation]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vendaOuAluguel, setVendaOuAluguel] = useState(0);

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
          <ExitButton
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <TextExitButton>OK</TextExitButton>
          </ExitButton>
        </ModalContainer>
      </Modal>
      <Tab.Navigator
        initialRouteName="Capital"
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
          children={() => <Capital />}
        />
        {a.map((value, index) => {
          return <Tab.Screen name={value} key={value} component={Regions} />;
        })}
      </Tab.Navigator>
    </>
  );
}
