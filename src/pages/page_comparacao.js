import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ion from 'react-native-vector-icons/Ionicons';
import Grafico from '../components/grafico';
import api from '../services/api';
import CustomPicker from '../components/customPicker';
import InfoGrafico from '../components/InfoGrafico';
import AppIntroSlider from 'react-native-app-intro-slider';
import InfoComp from '../components/infoComparacao';
import api1 from '../services/api';
import {
  StyleSheet,
  View,
  Text,
  Picker,
  Alert,
  Modal,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  Button,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import ApiBairro from '../controllers/apiBairro';

export default function Comparacao({route, navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon.Button
          name="cog"
          size={25}
          color="#fff"
          backgroundColor="#111111"
          borderRadius={100}
          onPress={() => setModalVisible(true)}
        />
      ),
    });
  }, [navigation]);
  
  const [valor1,setValor1] = useState(); 
  const [valor2,setValor2] = useState();
  const [recebido,setRecebido] = useState(false);
  const [recebido2,setRecebido2] = useState(false);
  const [valueGrafico1, setValueGrafico1] = useState();
  const [valueGrafico2, setValueGrafico2] = useState();
  async function getApi1() {
    let api1 = await api.get(`/sales/media/${route.params.bairro1}`);
    setValor1(api1.data);
  }
  useEffect(() => {
    if (valor1 === undefined) {
      getApi1();
      
    } else {
      setRecebido(true);
      setValueGrafico1(valor1);
    }
  }, [valor1]);
  async function getApi2() {
    let api1 = await api.get(`/sales/media/${route.params.bairro2}`);
    setValor2(api1.data);
  }
  useEffect(() => {
    if (valor2 === undefined) {
      getApi2();
      
    } else {
      setRecebido2(true);
      setValueGrafico2(valor2);
    }
  }, [valor2]);
  

  const legenda = [route.params.bairro1, route.params.bairro2];

  const [valueGraficoExtra, setValueGraficoExtra] = useState({
    ySufixo: '',
    yPrefixo: 'R$ ',
    mensagem: 'R$',
    descricao: 'média de venda em',
    decimal: 0,
  });

  const [selectedValue, setSelectedValue] = useState(parseInt(2010));
  const [selectedValuePicker2, setSelectedValuePicker2] = useState(
    parseInt(2020),
  );

  const [modalVisible, setModalVisible] = useState(false);

  const [tipoDados, setTipoDados] = useState(0);

  const [valorFilter, setValorFilter] = useState([]);
  const [valorFilter2, setValorFilter2] = useState([]);

  var infoBairro = [
    {
      bairros: [route.params.bairro1, route.params.bairro2],
      tipoDados: tipoDados,
      valueGraficoExtra: valueGraficoExtra,
      valueGrafico: valueGrafico1,
      anoValue: valorFilter,
      valueGrafico2: valueGrafico2,
      anoValue2: valorFilter,
      tipo: 0,
      key: `${route.params.bairro1}, ${route.params.bairro2}`
    },
    {
      bairro: route.params.bairro1,
      valueGrafico: valueGrafico1,
      valueGraficoExtra: valueGraficoExtra,
      tipoDados: tipoDados,
      anoValue: valorFilter,
      tipo: 1,
      key: route.params.bairro1
    },
    {
      bairro: route.params.bairro2,
      valueGrafico: valueGrafico2,
      valueGraficoExtra: valueGraficoExtra,
      tipoDados: tipoDados,
      anoValue: valorFilter,
      tipo: 1,
      key: route.params.bairro2
    },
  ];
  function filtraDados() {
    if (tipoDados === 0) {
      setValueGrafico1(
        valor1.filter(
          (item) =>
            (parseInt(item.label) >= selectedValue &&
              parseInt(item.label) <= selectedValuePicker2) ||
            (parseInt(item.label) <= selectedValue &&
              parseInt(item.label) >= selectedValuePicker2),
        ),
      );

      setValueGrafico2(
        valor2.filter(
          (item) =>
            (parseInt(item.label) >= selectedValue &&
              parseInt(item.label) <= selectedValuePicker2) ||
            (parseInt(item.label) <= selectedValue &&
              parseInt(item.label) >= selectedValuePicker2),
        ),
      );

      setValueGraficoExtra({
        ySufixo: '',
        yPrefixo: 'R$ ',
        mensagem: 'R$',
        descricao: 'média de venda em',
        decimal: 0,
      });
    } else {
      var anoPorcent;
      const anoValorFilter = valor1.filter(
        (item) =>
          (parseInt(item.label) >= selectedValue &&
            parseInt(item.label) <= selectedValuePicker2) ||
          (parseInt(item.label) <= selectedValue &&
            parseInt(item.label) >= selectedValuePicker2),
      );
      setValorFilter(anoValorFilter);
      if (selectedValue === selectedValuePicker2) {
        anoPorcent = [{label: selectedValue, data: 0}];
      } else {
        anoPorcent = anoValorFilter.map((item) => {
          let data = (100 * item.data) / anoValorFilter[0].data - 100;
          return {label: item.label, data: data.toFixed(2)};
        });
      }
      setValueGrafico1(anoPorcent);
      setValueGraficoExtra({
        ySufixo: ' %',
        yPrefixo: '',
        mensagem: '%',
        descricao: 'crescimeto em ',
        decimal: 2,
      });

      const anoValorFilter2 = valor2.filter(
        (item) =>
          (parseInt(item.label) >= selectedValue &&
            parseInt(item.label) <= selectedValuePicker2) ||
          (parseInt(item.label) <= selectedValue &&
            parseInt(item.label) >= selectedValuePicker2),
      );
      setValorFilter2(anoValorFilter2);
      if (selectedValue === selectedValuePicker2) {
        anoPorcent = [{label: selectedValue, data: 0}];
      } else {
        anoPorcent = anoValorFilter2.map((item) => {
          let data = (100 * item.data) / anoValorFilter2[0].data - 100;
          return {label: item.label, data: data.toFixed(2)};
        });
      }
      setValueGrafico2(anoPorcent);
      setValueGraficoExtra({
        ySufixo: ' %',
        yPrefixo: '',
        mensagem: '%',
        descricao: 'crescimeto em ',
        decimal: 2,
      });
    }
    infoBairro[0] = {
      valueGrafico: valueGrafico1,
      valueGraficoExtra: valueGraficoExtra,
      tipoDados: tipoDados,
      anoValue: valorFilter,
      valueGrafico2: valueGrafico2,
      anoValue2: valorFilter2,
    };
    infoBairro[1] = {
      valueGrafico: valueGrafico1,
      valueGraficoExtra: valueGraficoExtra,
      tipoDados: tipoDados,
      anoValue: valorFilter,
    };
    infoBairro[2] = {
      valueGrafico: valueGrafico2,
      valueGraficoExtra: valueGraficoExtra,
      tipoDados: tipoDados,
      anoValue: valorFilter2,
    };
  }
  useEffect(() => {
    //console.log(infoBairro);
  }, [infoBairro]);
  function renderItem({item: bairro}) {
    if (bairro.tipo === 0) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('window').width,
          }}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>
            {bairro.bairros[0]} X {bairro.bairros[1]}
          </Text>
          <InfoComp
            valueGrafico={bairro.valueGrafico}
            valueGraficoExtra={bairro.valueGraficoExtra}
            tipoDados={bairro.tipoDados}
            anoValue={bairro.anoValue}
            bairros={bairro.bairros}
            valueGrafico2={bairro.valueGrafico2}
            anoValue2={bairro.anoValue2}
          />
        </View>
      );
    }
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: Dimensions.get('window').width,
        }}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>
          {bairro.bairro}
        </Text>
        <InfoGrafico
          valueGrafico={bairro.valueGrafico}
          valueGraficoExtra={bairro.valueGraficoExtra}
          tipoDados={bairro.tipoDados}
          anoValue={bairro.anoValue}
        />
      </View>
    );
  }
  return !recebido || !recebido2 ? (
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
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            //Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modalView}>
            <View style={styles.containerOptions}>
              <Text style={{fontSize: 20, marginTop: 10, margin: 5}}>De</Text>
              <Picker
                selectedValue={selectedValue}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                {valor1.map((item, index) => (
                  <Picker.Item
                    label={item.label}
                    value={parseInt(item.label)}
                    key={item.label}
                  />
                ))}
              </Picker>
              <Text style={{fontSize: 20, marginTop: 10, margin: 5}}>até</Text>
              <Picker
                selectedValue={selectedValuePicker2}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValuePicker2(itemValue)
                }>
                {valor1.map((item, index) => (
                  <Picker.Item
                    label={item.label}
                    value={parseInt(item.label)}
                    key={item.label}
                  />
                ))}
              </Picker>
            </View>
            <CustomPicker
              label="Opção de dados"
              data={['valor vendido', 'porcentagem']}
              currentIndex={tipoDados}
              onSelected={setTipoDados}
            />
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#000'}}
              onPress={() => {
                setModalVisible(!modalVisible);
                filtraDados();
              }}>
              <Text style={styles.textStyle}>OK</Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 30, color: '#000'}}>
              Valorização 
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 30, color: '#000'}}>
              {route.params.bairro1} x {route.params.bairro2}
            </Text>
          </View>
          <Grafico
            labels={valueGrafico1.map((item, index) => item.label)}
            data={[
              {
                data: valueGrafico1.map((item, index) => item.data),
                color: () => '#00f',
              },
              {
                data: valueGrafico2.map((item, index) => item.data),
                color: () => '#f00',
              },
            ]}
            ySufixo={valueGraficoExtra.ySufixo}
            yPrefixo={valueGraficoExtra.yPrefixo}
            legenda={legenda}
            anoValorFilter={valorFilter}
          />
          <AppIntroSlider
            renderItem={renderItem}
            data={infoBairro}
            activeDotStyle={{backgroundColor: 'rgba(200, 200, 200, .9)'}}
            dotStyle={{backgroundColor: '#fafafa'}}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  containerOptions: {
    flexDirection: 'row',
    alignSelf: 'auto',
  },

  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
