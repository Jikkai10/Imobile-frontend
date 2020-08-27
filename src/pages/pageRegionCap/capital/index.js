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

export default function capital({route, isSale, firstYear, lastYear}) {
  function ordenarPorAno(a, b) {
    return a.ano - b.ano;
  }
  const [apiGet, setApiGet] = useState();
  const [recebido, setRecebido] = useState(false);
  const [valorPorcentagem,setValorPorcentagem] = useState([]);
  const [venda, setVenda] = useState();
  async function getApiVendas() {
    let apiCap = await api.get(`/vendasCap/ano/${firstYear}/${lastYear}`);
    setApiGet(apiCap);
  }

  async function getApiAluguel() {
    let apiCap = await api.get(`/aluguelCap/ano/${firstYear}/${lastYear}`);
    setApiGet(apiCap);
  }
  useEffect(()=>{
    setRecebido(false);
  },[firstYear]);
  useEffect(()=>{
    setRecebido(false);
  },[lastYear]);
  useEffect(()=>{
    setRecebido(false);
  },[isSale]);
  useEffect(()=>{
    if(!recebido){
      if(isSale === 0){
        getApiVendas();
        setVenda(true);
      }else{
        getApiAluguel();
        setVenda(false);
      }
    }
  },[recebido]);
  useEffect(() => {
    if (apiGet !== undefined) {
      setRecebido(true);
      
      if(isSale === 0){
        setValorPorcentagem(valorParaPorcentagem(apiGet));
      }
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
  ) : venda ? (
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
          <Description>Variação da média de alugueis:</Description>
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
                (item, index) => item.numeroAluguel[0]*100/apiGet.data[0].numeroAluguel[0] -100,
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
                (item, index) => item.valorAluguel[0],
              ),
              color: () => '#00f',
            },
            {
              data: apiGet.data.map(
                (item, index) => item.valorAluguel[1],
              ),
              color: () => '#f00',
            },
            {
              data: apiGet.data.map(
                (item, index) => item.valorAluguel[2],
              ),
              color: () => '#ff8200',
            },
            {
              data: apiGet.data.map(
                (item, index) => item.valorAluguel[3],
              ),
              color: () => '#000',
            },
          ]}
          labels={apiGet.data.map((item, index) => item.ano)}
          legenda={['0-200', '201-400', '401-600', '601-800']}
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
              data: apiGet.data.map(
                (item, index) => item.aluguelDorm[0],
              ),
              color: () => '#00f',
            },
            {
              data: apiGet.data.map(
                (item, index) => item.aluguelDorm[1],
              ),
              color: () => '#f00',
            },
            {
              data: apiGet.data.map(
                (item, index) => item.aluguelDorm[2],
              ),
              color: () => '#ff8200',
            },
            {
              data: apiGet.data.map(
                (item, index) => item.aluguelDorm[3],
              ),
              color: () => '#000',
            },
          ]}
          labels={apiGet.data.map((item, index) => item.ano)}
          legenda={['kit', '1 dorm', '2 dorm', '3 dorm']}
          sufixo='%'
        />
      </GraficoConteiner>
    </Container>
  );
}
