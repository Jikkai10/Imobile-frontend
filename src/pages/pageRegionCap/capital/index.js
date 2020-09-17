import React, {useState, useEffect, useRef} from 'react';
import Grafico from '../../../components/grafico';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Modal, FlatList} from 'react-native';
import {
  Container,
  ModalContainer,
  ExitButton,
  TextExitButton,
  Description,
  GraficoConteiner,
  ConfiguracaoConteiner,
} from '../style';
import {Configuracao} from './style';
import api from '../../../services/api';
import Loading from '../../../components/loading';
import ModalConfGrafico from '../../../components/modalConfGrafico';
import Legenda from '../../../components/legenda';

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
    '#fff',
    '#0f0',
    '#0ff',
    '#ff0',
    '#f0f',
    '#ff7',
    '#909',
    '#555',
  ];
  const modalConf1 = useRef(null);
  const modalConf2 = useRef(null);
  const modalConf3 = useRef(null);
  const modalConf4 = useRef(null);
  const modalConf5 = useRef(null);
  const modalConf6 = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [listaNumVend, setListaNumVend] = useState([[true, false, false]]);
  const descriptionNumVend = ['Número de Vendas'];
  const descriptionNumVendExtra = [['Total', 'Casas', 'Apartamentos']];


  const [listaPreco, setListaPreco] = useState([
    [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [true, true, false, false, false, false, false, false, false, false],
  ]);
  const descriptionPreco = ['Valor de venda:', 'Valor por m²:'];
  const descriptionPrecoExtra = [
    [
      'até 100k',
      'até 200k',
      'até 300k',
      'até 400k',
      'até 500k',
      'até 600k',
      'até 700k',
      'até 800k',
      'até 900k',
      'até 1000k',
      '+ de 1000k',
    ],
    [
      'até 2000',
      'até 3000',
      'até 4000',
      'até 5000',
      'até 6000',
      'até 7000',
      'até 8000',
      'até 9000',
      'até 10000',
      '+ de 10000',
    ],
  ];

  const [listaTipo, setListaTipo] = useState([
    [
      true,
      false,
      false,
    ],
    [true, true, false, false, false, false],
    [true, true, false, false, false, false],
  ]);
  const descriptionTipo = ['Tipo do imóvel:', 'Número de dormitórios:','Número de garagens:'];
  const descriptionTipoExtra = [
    [
      'luxo',
      'médio',
      'simples',
    ],
    [
      'kitnet',
      '1 dormitório',
      '2 dormitórios',
      '3 dormitórios',
      '4 dormitórios',
      '+ de 4 dormitórios',
    ],
    [
      '0 vagas de garagem',
      '1 vaga de garagem',
      '2 vagas de garagem',
      '3 vagas de garagem',
      '+ de 3 vagas de garagem',
    ],
  ];

  const [listaAlugNum, setListaAlugNum] = useState([
    [
      true,
      false,
      false,
    ],
  ]);
  const descriptionAlugNum = ['Número de Alugueis:'];
  const descriptionAlugNumExtra = [
    [
      'Total',
      'Casas',
      'Apartamentos',
    ],
  ];

  const [listaAlugValor, setListaAlugValor] = useState([
    [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  ]);
  const descriptionAlugValor = ['Valor de Aluguel:','Valor por m²:'];
  const descriptionAlugValorExtra = [
    [
      'até 200',
      'até 400',
      'até 600',
      'até 800',
      'até 1000',
      'até 1200',
      'até 1400',
      'até 1600',
      'até 1800',
      'até 2000',
      '+ de 2000',
    ],
    [
      'até 10',
      'até 15',
      'até 20',
      'até 25',
      'até 30',
      'até 35',
      '+ de 35',
    ],
  ];
  
  const [listaAlugTipo, setListaAlugTipo] = useState([
    [true, true, false, false, false, false],
    [true, true, false, false, false],
  ]);
  const descriptionAlugTipo = ['Número de dormitórios:','Número de garagens:'];
  const descriptionAlugTipoExtra = [
    [
      'kitnet',
      '1 dormitório',
      '2 dormitórios',
      '3 dormitórios',
      '4 dormitórios',
      '+ de 4 dormitórios',
    ],
    [
      '0 vagas de garagem',
      '1 vaga de garagem',
      '2 vagas de garagem',
      '3 vagas de garagem',
      '+ de 3 vagas de garagem',
    ],
  ];

  function ajeitaDescription(desc, list) {
    let cont = 0;
    let description = desc.map((value, index) => {
      let descriptionValue = value
        .filter((item, iIndex) => list[index][iIndex])
        .map((item, iValue) => {
          cont += 1;
          return {value: item, color: colors[cont - 1]};
        });
      return descriptionValue;
    });

    return description;
  }

  function grupoDeValores(api,listaInicial) {
    let apiT = api.map((itemApi) => 
      apiGet.data[0][itemApi].map((item, index) => {
        let data = apiGet.data.map((valor, vIndex) => valor[itemApi][index]);
        return data;
      })
    );
    

    let valor = [];
    apiT.forEach((item) => item.forEach((value) => valor.push(value)))


    let lista = [];
    listaInicial.forEach((value, index) =>
      value.forEach((value, index) => lista.push(value)),
    );
    valor = valor.filter((value, index) => lista[index]);
    valor = valor.map((value, index) => {
      return {data: value, color: () => colors[index]};
    });

    return valor;
  }

  return !recebido ? (
    <Loading />
  ) : venda ? (
    <Container >
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Variação da média de vendas:</Description>
          <Configuracao onPress={() => modalConf1.current?.open()}>
            <Icon name="cog" size={20} color="#fff" />
          </Configuracao>

          <ModalConfGrafico
            visible={modalConf1}
            listaRecebida={listaNumVend}
            setLista={setListaNumVend}
            description={descriptionNumVend}
            descriptionExtra={descriptionNumVendExtra}
          />
        </ConfiguracaoConteiner>
        <Legenda
          colors={colors}
          values={ajeitaDescription(descriptionNumVendExtra, listaNumVend)}
          valuesTipo={descriptionNumVend}
        />
        <Grafico
          data={apiGet.data[0].vendTot
            .map((item, index) => {
              let data = {
                data: apiGet.data.map(
                  (valor, vIndex) =>
                    (valor.vendTot[index] * 100) /
                      apiGet.data[0].vendTot[index] -
                    100,
                ),
                color: () => colors[index],
              };

              return data;
            })
            .filter((value, index) => {
              return listaNumVend[0][index];
            })}
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo="%"
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Ocorrência por grupo de preço:</Description>
          <Configuracao onPress={() => modalConf2.current?.open()}>
            <Icon name="cog" size={20} color="#fff" />
          </Configuracao>
          <ModalConfGrafico
            visible={modalConf2}
            listaRecebida={listaPreco}
            setLista={setListaPreco}
            description={descriptionPreco}
            descriptionExtra={descriptionPrecoExtra}
          />
        </ConfiguracaoConteiner>
        <Legenda
          colors={colors}
          values={ajeitaDescription(descriptionPrecoExtra, listaPreco)}
          valuesTipo={descriptionPreco}
        />
        <Grafico
          data={grupoDeValores(['valorVendas','valorVendasM2'],listaPreco)}
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo="%"
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Ocorrência por tipo do imóvel:</Description>
          <Configuracao onPress={() => modalConf3.current?.open()}>
            <Icon name="cog" size={20} color="#fff" />
          </Configuracao>
          <ModalConfGrafico
            visible={modalConf3}
            listaRecebida={listaTipo}
            setLista={setListaTipo}
            description={descriptionTipo}
            descriptionExtra={descriptionTipoExtra}
          />
        </ConfiguracaoConteiner>
        <Legenda
          colors={colors}
          values={ajeitaDescription(descriptionTipoExtra, listaTipo)}
          valuesTipo={descriptionTipo}
        />
        <Grafico
          data={grupoDeValores(['vendaTipoImovel','numDorm','numGar'],listaTipo)}
          labels={apiGet.data.map((item, index) => item.ano)}
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
          <Configuracao onPress={() => modalConf4.current?.open()}>
            <Icon name="cog" size={20} color="#fff" />
          </Configuracao>
          <ModalConfGrafico
            visible={modalConf4}
            listaRecebida={listaAlugNum}
            setLista={setListaAlugNum}
            description={descriptionAlugNum}
            descriptionExtra={descriptionAlugNumExtra}
          />
        </ConfiguracaoConteiner>
        <Legenda
          colors={colors}
          values={ajeitaDescription(descriptionAlugNumExtra, listaAlugNum)}
          valuesTipo={descriptionAlugNum}
        />
        <Grafico
          data={apiGet.data[0].numeroAluguel
            .map((item, index) => {
              let data = {
                data: apiGet.data.map(
                  (valor, vIndex) =>
                    (valor.numeroAluguel[index] * 100) /
                      apiGet.data[0].numeroAluguel[index] -
                    100,
                ),
                color: () => colors[index],
              };

              return data;
            })
            .filter((value, index) => {
              return listaAlugNum[0][index];
            })}
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo="%"
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Ocorrência por grupo de preço:</Description>
          <Configuracao onPress={() => modalConf5.current?.open()}>
            <Icon name="cog" size={20} color="#fff" />
          </Configuracao>
          <ModalConfGrafico
            visible={modalConf5}
            listaRecebida={listaAlugValor}
            setLista={setListaAlugValor}
            description={descriptionAlugValor}
            descriptionExtra={descriptionAlugValorExtra}
          />
        </ConfiguracaoConteiner>
        <Legenda
          colors={colors}
          values={ajeitaDescription(descriptionAlugValorExtra, listaAlugValor)}
          valuesTipo={descriptionAlugValor}
        />
        <Grafico
          data={grupoDeValores(['valorAluguel','valorAluguelM2'],listaAlugValor)}
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo="%"
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Ocorrência por número de quartos:</Description>
          <Configuracao onPress={() => modalConf6.current?.open()}>
            <Icon name="cog" size={20} color="#fff" />
          </Configuracao>
          <ModalConfGrafico
            visible={modalConf6}
            listaRecebida={listaAlugTipo}
            setLista={setListaAlugTipo}
            description={descriptionAlugTipo}
            descriptionExtra={descriptionAlugTipoExtra}
          />
        </ConfiguracaoConteiner>
        <Legenda
          colors={colors}
          values={ajeitaDescription(descriptionAlugTipoExtra, listaAlugTipo)}
          valuesTipo={descriptionAlugTipo}
        />
        <Grafico
          data={grupoDeValores(['aluguelDorm','aluguelGar'],listaAlugTipo)}
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo="%"
        />
      </GraficoConteiner>
    </Container>
  );
}
