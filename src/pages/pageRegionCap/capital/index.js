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
} from '../style';
import api from '../../../services/api';
import Loading from '../../../components/loading';
import ModalConfGrafico from '../../../components/modalConfGrafico';

export default function capital({route, isSale, firstYear, lastYear}) {
  const [apiGet, setApiGet] = useState();
  const [recebido, setRecebido] = useState(false);

  const [venda, setVenda] = useState();

  const [checked, setChecked] = useState(false);

  async function getApiVendas() {
    let apiCap = await api.get(`/vendasCap/ano/${firstYear}/${lastYear}`);
    setApiGet(apiCap);
  }

  async function getApiAluguel() {
    let apiCap = await api.get(`/aluguelCap/ano/${firstYear}/${lastYear}`);
    setApiGet(apiCap);
  }

  useEffect(() => {
    setRecebido(false);
  }, [firstYear]);

  useEffect(() => {
    setRecebido(false);
  }, [lastYear]);

  useEffect(() => {
    setRecebido(false);
  }, [isSale]);

  useEffect(() => {
    if (!recebido) {
      if (isSale === 0) {
        getApiVendas();
        setVenda(true);
      } else {
        getApiAluguel();
        setVenda(false);
      }
    }
  }, [recebido]);

  useEffect(() => {
    if (apiGet !== undefined) {
      setRecebido(true);
    }
  }, [apiGet]);

  const colors = [
    '#00f',
    '#f00',
    '#ff8200',
    '#000',
    '#0f0',
    '#0ff',
    '#ff0',
    '#f0f',
    '#ff7',
    '#909',
    '#555',
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [listaNumVend, setListaNumVend] = useState([[true, false, false]]);

  const descriptionNumVend = ['Número de Vendas'];
  const descriptionNumVendExtra = [['Total', 'Apartamentos', 'Casas']];
  
  return !recebido ? (
    <Loading />
  ) : venda ? (
    <Container>
      <ModalConfGrafico
        visible={modalVisible}
        setVisible={setModalVisible}
        listaRecebida={listaNumVend}
        setLista={setListaNumVend}
        description={descriptionNumVend}
        descriptionExtra={descriptionNumVendExtra}
      />
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Variação da média de vendas:</Description>
          <Icon.Button
            name="cog"
            size={20}
            color="#000"
            background="#fff"
            backgroundColor="#fff"
            //borderRadius={100}
            onPress={() => setModalVisible(true)}
          />
        </ConfiguracaoConteiner>
        <Grafico
          data={
            
              apiGet.data[0].vendTot.map((item, index) => {
                let data = {
                  data: apiGet.data.map(
                    (valor, vIndex) =>
                      (valor.vendTot[index] * 100) / apiGet.data[0].vendTot[index] - 100,
                  ),
                  color: () => colors[index],
                };
                
                return data;
              }).filter((value,index)=>{return listaNumVend[0][index]})
            
          }
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo="%"
          legenda={descriptionNumVendExtra[0].filter((value,index) => listaNumVend[0][index])}
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Ocorrência por grupo de preço:</Description>
          <Icon.Button
            name="cog"
            size={20}
            color="#000"
            background="#fff"
            backgroundColor="#fff"
            //borderRadius={100}
            onPress={() => setModalVisible(true)}
          />
        </ConfiguracaoConteiner>
        <Grafico
          data={apiGet.data[0].valorVendas.map((item, index) => {
            let data = {
              data: apiGet.data.map(
                (valor, vIndex) => valor.valorVendas[index],
              ),
              color: () => colors[index],
            };
            return data;
          })}
          labels={apiGet.data.map((item, index) => item.ano)}
          legenda={['0-100', '101-200', '201-300', '301-400']}
          sufixo="%"
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Ocorrência por tipo do imóvel:</Description>
          <Icon.Button
            name="cog"
            size={20}
            color="#000"
            background="#fff"
            backgroundColor="#fff"
            //borderRadius={100}
            onPress={() => setModalVisible(true)}
          />
        </ConfiguracaoConteiner>
        <Grafico
          data={[
            {
              data: apiGet.data.map((item, index) => item.vendaTipoImovel[0]),
              color: () => '#00f',
            },
            {
              data: apiGet.data.map((item, index) => item.vendaTipoImovel[1]),
              color: () => '#f00',
            },
            {
              data: apiGet.data.map((item, index) => item.vendaTipoImovel[2]),
              color: () => '#000',
            },
          ]}
          labels={apiGet.data.map((item, index) => item.ano)}
          legenda={['luxo', 'medio', 'standard']}
          sufixo="%"
        />
      </GraficoConteiner>
    </Container>
  ) : (
    <Container>
      <Modal
        animationType="slide"
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
            background="#fff"
            backgroundColor="#fff"
            //borderRadius={100}
            onPress={() => setModalVisible(true)}
          />
        </ConfiguracaoConteiner>
        <Grafico
          data={[
            {
              data: apiGet.data.map(
                (item, index) =>
                  (item.numeroAluguel[0] * 100) /
                    apiGet.data[0].numeroAluguel[0] -
                  100,
              ),
              color: () => '#00f',
            },
          ]}
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo="%"
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Ocorrência por grupo de preço:</Description>
          <Icon.Button
            name="cog"
            size={20}
            color="#000"
            background="#fff"
            backgroundColor="#fff"
            //borderRadius={100}
            onPress={() => setModalVisible(true)}
          />
        </ConfiguracaoConteiner>
        <Grafico
          data={[
            {
              data: apiGet.data.map((item, index) => item.valorAluguel[0]),
              color: () => '#00f',
            },
            {
              data: apiGet.data.map((item, index) => item.valorAluguel[1]),
              color: () => '#f00',
            },
            {
              data: apiGet.data.map((item, index) => item.valorAluguel[2]),
              color: () => '#ff8200',
            },
            {
              data: apiGet.data.map((item, index) => item.valorAluguel[3]),
              color: () => '#000',
            },
          ]}
          labels={apiGet.data.map((item, index) => item.ano)}
          legenda={['0-200', '201-400', '401-600', '601-800']}
          sufixo="%"
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Ocorrência por número de quartos:</Description>
          <Icon.Button
            name="cog"
            size={20}
            color="#000"
            background="#fff"
            backgroundColor="#fff"
            //borderRadius={100}
            onPress={() => setModalVisible(true)}
          />
        </ConfiguracaoConteiner>
        <Grafico
          data={[
            {
              data: apiGet.data.map((item, index) => item.aluguelDorm[0]),
              color: () => '#00f',
            },
            {
              data: apiGet.data.map((item, index) => item.aluguelDorm[1]),
              color: () => '#f00',
            },
            {
              data: apiGet.data.map((item, index) => item.aluguelDorm[2]),
              color: () => '#ff8200',
            },
            {
              data: apiGet.data.map((item, index) => item.aluguelDorm[3]),
              color: () => '#000',
            },
          ]}
          labels={apiGet.data.map((item, index) => item.ano)}
          legenda={['kit', '1 dorm', '2 dorm', '3 dorm']}
          sufixo="%"
        />
      </GraficoConteiner>
    </Container>
  );
}
