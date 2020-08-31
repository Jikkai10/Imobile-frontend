import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ConteinerSelect,
  ButtonRegion,
  DescriptionButtonRegion,
} from './style';
import {Container,GraficoConteiner,Description,ConfiguracaoConteiner} from '../style';
import SelectRegion from '../../../components/modalSelectRegiao';
import Grafico from '../../../components/grafico';
import api from '../../../services/api';
import Loading from '../../../components/loading';

function ordenarPorMes(a, b) {
  return a.mes - b.mes;
}

export default function valRegiao({isSale, firstYear, lastYear}) {
  //return (function () {
  const [apiGet, setApiGet] = useState();
  const [recebido, setRecebido] = useState(false);

  const [selectRegionVisible, setSelectRegionVisible] = useState(false);
  const lista = [
    {
      nome: 'Região A',
      value: 'a',
      id: 'a',
    },
    {
      nome: 'Região B',
      value: 'b',
      id: 'b',
    },
    {
      nome: 'Região C',
      value: 'c',
      id: 'c',
    },
    {
      nome: 'Região D',
      value: 'd',
      id: 'd',
    },
    {
      nome: 'Região E',
      value: 'e',
      id: 'e',
    },
  ];
  const [regionSelected, setRegionSelected] = useState({
    value: 'a',
    name: 'Região A',
  });

  async function getApiVenda() {
    let apiCap = await api.get(`/vendasRCap/${regionSelected.value}/ano/${firstYear}/${lastYear}`);
    setApiGet(apiCap);
  }

  async function getApiAluguel() {
    let apiCap = await api.get(`/aluguelRCap/${regionSelected.value}/ano/${firstYear}/${lastYear}`);
    setApiGet(apiCap);
  }

  useEffect(() => {
    setRecebido(false);
  },[regionSelected]);

  useEffect(() => {
    setRecebido(false);
  }, [isSale]);

  useEffect(() => {
    setRecebido(false);
  }, [firstYear]);

  useEffect(() => {
    setRecebido(false);
  }, [lastYear]);
  useEffect(() => {
    if (apiGet !== undefined) {
      setRecebido(true);
    }
  }, [apiGet]);

  const [venda, setVenda] = useState();

  useEffect(() => {
    if (!recebido) {
      if (isSale === 0) {
        getApiVenda();
        setVenda(true);
      } else {
        getApiAluguel();
        setVenda(false);
      }
    }
  }, [recebido]);

  //console.log(apiGet.data);
  return !recebido ? (
    <Loading/>
  ) : venda ? (
    <Container>
      <ConteinerSelect>
        <Description>Selecione a região: </Description>
        <ButtonRegion onPress={() => setSelectRegionVisible(true)}>
          <DescriptionButtonRegion>{regionSelected.name}</DescriptionButtonRegion>
        </ButtonRegion>
        <SelectRegion
          modalVisible={selectRegionVisible}
          setModalVisible={setSelectRegionVisible}
          setRegion={setRegionSelected}
          lista={lista}
        />
      </ConteinerSelect>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Variação de vendas:</Description>
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
                  (item.numeroVendas[0] * 100) /
                    apiGet.data[0].numeroVendas[0] - 100,
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
          <Description>Média de preços:</Description>
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
              data: apiGet.data.map((item, index) => item.valorMedio),
              color: () => '#00f',
            },
          ]}
          labels={apiGet.data.map((item, index) => item.ano)}
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
      <ConteinerSelect>
        <Description>Selecione a região: </Description>
        <ButtonRegion onPress={() => setSelectRegionVisible(true)}>
          <DescriptionButtonRegion>{regionSelected.name}</DescriptionButtonRegion>
        </ButtonRegion>
        <SelectRegion
          modalVisible={selectRegionVisible}
          setModalVisible={setSelectRegionVisible}
          setRegion={setRegionSelected}
          lista={lista}
        />
      </ConteinerSelect>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Variação de alugueis:</Description>
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
          <Description>Média de preços:</Description>
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
              data: apiGet.data.map((item, index) => item.valorMedio),
              color: () => '#00f',
            },
          ]}
          labels={apiGet.data.map((item, index) => item.ano)}
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Ocorrência por número de dormitórios:</Description>
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
              color: () => '#000',
            },
            {
              data: apiGet.data.map((item, index) => item.aluguelDorm[3]),
              color: () => '#ff8200',
            },
          ]}
          labels={apiGet.data.map((item, index) => item.ano)}
          legenda={['kit', '1 dorm', '2 dorm', '3 dorm']}
          sufixo="%"
        />
      </GraficoConteiner>
    </Container>
  );
  //});
  //    };
  //});
}
