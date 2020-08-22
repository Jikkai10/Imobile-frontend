import React, {useState, useEffect} from 'react';
import Grafico from '../../../components/grafico';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Modal, Text, Image} from 'react-native';
import {
  Container,
  ModalContainer,
  ExitButton,
  TextExitButton,
  Description,
  GraficoConteiner,
  ConfiguracaoConteiner,
} from './style';
import api from '../../../services/api';

export default function capital({route}) {
  function ordenarPorAno(a, b) {
    return a.ano - b.ano;
  }
  const [apiGet, setApiGet] = useState();
  const [recebido, setRecebido] = useState(false);
  const [valorPorcentagem,setValorPorcentagem] = useState([]);
  async function getApi() {
    let apiCap = await api.get('/vendasCap/ano');
    setApiGet(apiCap);
  }
  useEffect(() => {
    if (apiGet === undefined) {
      getApi();
    } else {
      setRecebido(true);
      //apiGet.data.sort(ordenarPorAno);
      setValorPorcentagem(valorParaPorcentagem(apiGet));
    }
  }, [apiGet]);

  function valorParaPorcentagem(api){
    let valorInicial = api.data[0].vendTot;
    let valoresPorcentagem = api.data.map((item,index)=> item.vendTot*100/valorInicial - 100);
    return valoresPorcentagem;
  }

  const [modalVisible, setModalVisible] = useState(false);

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
    <Container>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          //Alert.alert('Modal has been closed.');
        }}>
        <ModalContainer>
          <ExitButton
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <TextExitButton>OK</TextExitButton>
          </ExitButton>
        </ModalContainer>
      </Modal>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Variação da média de vendas:</Description>
          <Icon.Button
            name="cog"
            size={20}
            color="#000"
            background='#fff'
            backgroundColor="#fff"
            //borderRadius={100}
            onPress={() => setModalVisible(true)}
          />
        </ConfiguracaoConteiner>
        <Grafico
          data={[
            {
              data: valorPorcentagem.map(
                (item, index) => item,
              ),
              color: () => '#00f',
            },
          ]}
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo='%'
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Ocorrência por grupo de preço:</Description>
          <Icon.Button
            name="cog"
            size={20}
            color="#000"
            background='#fff'
            backgroundColor="#fff"
            //borderRadius={100}
            onPress={() => setModalVisible(true)}
          />
        </ConfiguracaoConteiner>
        <Grafico
          data={[
            {
              data: apiGet.data.map(
                (item, index) => item.valorVendas.vendas_100,
              ),
              color: () => '#00f',
            },
            {
              data: apiGet.data.map(
                (item, index) => item.valorVendas.vendas_200,
              ),
              color: () => '#f00',
            },
            {
              data: apiGet.data.map(
                (item, index) => item.valorVendas.vendas_300,
              ),
              color: () => '#ff8200',
            },
            {
              data: apiGet.data.map(
                (item, index) => item.valorVendas.vendas_400,
              ),
              color: () => '#000',
            },
          ]}
          labels={apiGet.data.map((item, index) => item.ano)}
          legenda={['0-100', '101-200', '201-300', '301-400']}
          sufixo='%'
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Ocorrência por tipo do imóvel:</Description>
          <Icon.Button
            name="cog"
            size={20}
            color="#000"
            background='#fff'
            backgroundColor="#fff"
            //borderRadius={100}
            onPress={() => setModalVisible(true)}
          />
        </ConfiguracaoConteiner>
        <Grafico
          data={[
            {
              data: apiGet.data.map((item, index) => item.vendaTipoImovel.luxo),
              color: () => '#00f',
            },
            {
              data: apiGet.data.map(
                (item, index) => item.vendaTipoImovel.medio,
              ),
              color: () => '#f00',
            },
            {
              data: apiGet.data.map(
                (item, index) => item.vendaTipoImovel.standard,
              ),
              color: () => '#000',
            },
          ]}
          labels={apiGet.data.map((item, index) => item.ano)}
          legenda={['luxo', 'medio', 'standard']}
          sufixo='%'
        />
      </GraficoConteiner>
    </Container>
  );
}
