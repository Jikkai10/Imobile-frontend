import React, {useState, useEffect} from 'react';
import Mapa from '../components/mapa';
import ModalEscolha from '../components/modal_escolha';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import api from '../services/api';
import MultiSlider from '../components/multiSlider';
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
  const [apiGet, setApiGet] = useState();
  const [recebido, setRecebido] = useState(true);
  const [lengthAno, setLength] = useState(0);
  const [anosSelecionados, setAnosSelecionados] = useState([2010, 2020]);
  const [modalVisibleComp, setModalVisibleComp] = useState(false);
  const [voltaBairro,setVoltaBairro] = useState();

  /*async function getApi() {
    let api1 = await api.get('/sales');
    setApiGet(api1);
  }
  useEffect(() => {
    if (apiGet === undefined) {
      getApi();
      console.log(apiGet);
    } else {
      setRecebido(true);
    }
  }, [apiGet]);*/
  

  return !recebido ? (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Carregando</Text>
        <Image
          style={{height: 200, width: 200}}
          source={{
            uri:
              'https://cdn141.picsart.com/318740554462211.png?type=webp&to=min&r=1024',
          }}
          alt="Logo"
        />
      </View>
    </>
  ) : (
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
            <ModalEscolha
              setBairro={setBairro}
              bairro={bairro}
              setVoltaBairro={setVoltaBairro}
              setModalVisibleComp={setModalVisibleComp}
              modalVisibleComp={modalVisibleComp}
            />
          </View>
        </View>
        <View>
          <Mapa
            bairro={bairro}
            setBairro={setBairro}
            //api={apiGet}
            navigation={navigation}
            anosSelecionados={anosSelecionados}
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
        <View style={{flex: 1, marginRight: 10}}>
          <MultiSlider
            selecionados={anosSelecionados}
            setSelecionados={setAnosSelecionados}
            lengthAno={lengthAno}
            setLength={setLength}
          />
        </View>
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
