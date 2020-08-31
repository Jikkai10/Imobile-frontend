import React, {useState, useEffect} from 'react';
import Mapa from '../components/mapa';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';

export default function MainMapa({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon.Button
          name="sign-in"
          size={25}
          color="#fff"
          backgroundColor="#111111"
          borderRadius={100}
          onPress={() => navigation.navigate('login')}
        />
      ),
    });
  }, [navigation]);
  
  const [region, setRegion] = useState();
  const [bairro, setBairro] = useState('Centro');
  const [modalVisibleComp, setModalVisibleComp] = useState(false);
  const [voltaBairro,setVoltaBairro] = useState();

  

  return (
    <>
      <View>
        <View
          style={{
            backgroundColor: '#242f3e',

            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              padding: 5,
            }}>
          </View>
        </View>
        <View>
          <Mapa
            bairro={bairro}
            setBairro={setBairro}
            navigation={navigation}
            setVoltaBairro={setVoltaBairro}
            voltaBairro={voltaBairro}
          />
        </View>
      </View>
      <View
        style={{
          alignSelf: 'flex-end',
          justifyContent: 'flex-end',
          flex: 1,
        }}>
       
        <View
          style={{
            backgroundColor: '#242f3e',
            opacity: 0.75,
            borderRadius: 15,
            alignItems: 'center',
            padding: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('avaliadores');
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              Encontre um avaliador
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
