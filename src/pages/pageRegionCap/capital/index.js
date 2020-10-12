import React, {useState, useEffect, useRef} from 'react';
import Grafico from '../../../components/grafico';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Modal, FlatList,Dimensions} from 'react-native';
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

export default function capital({route, isSale, firstYear, lastYear, region}) {
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

  async function getApiVendasRegion() {
    let apiCap = await api.get(
      `/vendasRegion/${region}/total/ano/${firstYear}/${lastYear}`,
    );
    setApiGet(apiCap);
  }

  async function getApiAluguelRegion() {
    let apiCap = await api.get(
      `/aluguelRegion/${region}/total/ano/${firstYear}/${lastYear}`,
    );
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
        if (region === 'capital') {
          getApiVendas();
        } else {
          getApiVendasRegion();
        }
        setVenda(true);
      } else {
        if (region === 'capital') {
          getApiAluguel();
        } else {
          getApiAluguelRegion();
        }
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

  const [listaNumVend, setListaNumVend] = useState([[true, false, false]]);

  const descriptionNumVend = ['Número de Vendas'];
  const descriptionNumVendExtra = [['Total', 'Casas', 'Apartamentos']];

  const [title, setTitle] = useState();

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
    [true, false, false],
    [true, true, false, false, false, false],
    [true, true, false, false, false, false],
  ]);
  const descriptionTipo = [
    'Tipo do imóvel:',
    'Número de dormitórios:',
    'Número de garagens:',
  ];
  const descriptionTipoExtra = [
    ['luxo', 'médio', 'simples'],
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

  const [listaAlugNum, setListaAlugNum] = useState([[true, false, false]]);
  const descriptionAlugNum = ['Número de Alugueis:'];
  const descriptionAlugNumExtra = [['Total', 'Casas', 'Apartamentos']];

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
    [true, false, false, false, false, false, false],
  ]);
  const descriptionAlugValor = ['Valor de Aluguel:', 'Valor por m²:'];
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
    ['até 10', 'até 15', 'até 20', 'até 25', 'até 30', 'até 35', '+ de 35'],
  ];
  const [parametrosApi, setParametrosApi] = useState();
  const [listaAlugTipo, setListaAlugTipo] = useState([
    [true, true, false, false, false, false],
    [true, true, false, false, false],
  ]);
  const descriptionAlugTipo = ['Número de dormitórios:', 'Número de garagens:'];
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

  const [description, setDescription] = useState();
  const [descriptionExtra, setDescriptionExtra] = useState();
  const [lista, setLista] = useState();
  useEffect(() => {
    if (venda) {
      setTitle([
        'Variação da média de vendas:',
        'Ocorrência por grupo de preço:',
        'Ocorrência por tipo do imóvel:',
      ]);
      setLista([listaNumVend, listaPreco, listaTipo]);
      setDescription([descriptionNumVend, descriptionPreco, descriptionTipo]);
      setDescriptionExtra([
        descriptionNumVendExtra,
        descriptionPrecoExtra,
        descriptionTipoExtra,
      ]);
      setParametrosApi([
        ['vendTot'],
        ['valorVendas', 'valorVendasM2'],
        ['vendaTipoImovel', 'numDorm', 'numGar'],
      ]);
    } else {
      setTitle([
        'Variação da média de alugueis:',
        'Ocorrência por grupo de preço:',
        'Ocorrência por tipo do imóvel:',
      ]);
      setLista([listaAlugNum, listaAlugValor, listaAlugTipo]);
      setDescription([
        descriptionAlugNum,
        descriptionAlugValor,
        descriptionAlugTipo,
      ]);
      setDescriptionExtra([
        descriptionAlugNumExtra,
        descriptionAlugValorExtra,
        descriptionAlugTipoExtra,
      ]);
      setParametrosApi([
        ['numeroAluguel'],
        ['valorAluguel', 'valorAluguelM2'],
        ['aluguelDorm', 'aluguelGar'],
      ]);
    }
  }, [venda]);
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

  function grupoDeValores(api, listaInicial) {
    let apiT = api.map((itemApi) =>
      apiGet.data[0][itemApi].map((item, index) => {
        let data = apiGet.data.map((valor, vIndex) => valor[itemApi][index]);
        return data;
      }),
    );

    let valor = [];
    apiT.forEach((item) => item.forEach((value) => valor.push(value)));

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

  function RenderItem(props) {
    const [listaItem, setListaItem] = useState(lista[props.index]);
    const [modalConf,setModalConf] = useState(false);
    const descriptionItem = description[props.index];
    const descriptionItemExtra = descriptionExtra[props.index];
    const parametrosApiItem = parametrosApi[props.index];

    return (
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <View style={{width: Dimensions.get('window').width * 0.8}}>
            <Description style={{flexWrap: 'wrap'}}>
              {title[props.index]}
            </Description>
          </View>
          <Configuracao onPress={() => setModalConf(true)}>
            <Icon name="cog" size={20} color="#fff" />
          </Configuracao>
          <ModalConfGrafico
            visible={modalConf}
            setVisible={setModalConf}
            listaRecebida={listaItem}
            setLista={setListaItem}
            description={descriptionItem}
            descriptionExtra={descriptionItemExtra}
          />
        </ConfiguracaoConteiner>
        <Legenda
          colors={colors}
          values={ajeitaDescription(descriptionItemExtra, listaItem)}
          valuesTipo={descriptionItem}
        />
        <Grafico
          data={grupoDeValores(parametrosApiItem, listaItem)}
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo="%"
        />
      </GraficoConteiner>
    );
  }

  return !recebido ? (
    <Loading />
  ) : (
    <FlatList
      data={title}
      renderItem={({index}) => <RenderItem index={index} />}
      style={{backgroundColor: '#13131a'}}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
