import React, {useState, useEffect, useRef} from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ConteinerSelect,
  ButtonRegion,
  DescriptionButtonRegion,
  Configuracao,
} from './style';
import {
  Container,
  GraficoConteiner,
  Description,
  ConfiguracaoConteiner,
} from '../style';
import ModalConfGrafico from '../../../components/modalConfGrafico';
import Legenda from '../../../components/legenda';
import SelectRegion from '../../../components/modalSelectRegiao';
import Grafico from '../../../components/grafico';
import api from '../../../services/api';
import Loading from '../../../components/loading';
import Error from '../../../components/error';
import selectRegion from '../../../components/modalSelectRegiao';

function ordenarPorMes(a, b) {
  return a.mes - b.mes;
}

export default function valRegiao({isSale, firstYear, lastYear, region}) {
  //return (function () {
  const [apiGet, setApiGet] = useState();
  const [venda, setVenda] = useState();
  const [recebido, setRecebido] = useState(false);
  const [error, setError] = useState(false);

  const [selectRegionVisible, setSelectRegionVisible] = useState(false);
  const [listaR, setListaR] = useState([
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
  ]);
  const [regionSelected, setRegionSelected] = useState({
    value: 'a',
    name: 'Região A',
  });

  async function getApiVenda() {
    try {
      let apiCap = await api.get(
        `/vendasRCap/${regionSelected.value}/ano/${firstYear}/${lastYear}`,
      );
      setApiGet(apiCap);
      setError(false);
    } catch {
      setError(true);
    }
  }

  async function getApiVendaCity() {
    try {
      let apiCap = await api.get(
        `/vendasCity/${region}/${regionSelected.value}/ano/${firstYear}/${lastYear}`,
      );
      setApiGet(apiCap);
      setError(false);
    } catch {
      setError(true);
    }
  }

  async function getApiAluguel() {
    try {
      let apiCap = await api.get(
        `/aluguelRCap/${regionSelected.value}/ano/${firstYear}/${lastYear}`,
      );
      setApiGet(apiCap);
      setError(false);
    } catch {
      setError(true);
    }
  }

  async function getApiAluguelCity() {
    try {
      let apiCap = await api.get(
        `/aluguelCity/${region}/${regionSelected.value}/ano/${firstYear}/${lastYear}`,
      );
      setApiGet(apiCap);
      setError(false);
    } catch {
      setError(true);
    }
  }
  const isFirstRun = useRef(true);
  const [recebidoNomes, setRecebidoNomes] = useState(false);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else if (region !== 'capital') {
      setRegionSelected({name: listaR[0].nome, value: listaR[0].value});
      setRecebidoNomes(true);
    }
  }, [listaR]);

  async function getNameCity() {
    let regionApi = await api.get(`/getCitys/${region}`);
    setListaR(
      regionApi.data.map((item) => {
        return {
          nome: item,
          value: item,
          id: item,
        };
      }),
    );
  }

  useEffect(() => {
    setRecebido(false);
  }, [regionSelected]);

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

  useEffect(() => {
    if (region !== 'capital') {
      getNameCity();
    }
  }, []);

  useEffect(() => {
    if (error) {
      if (isSale === 0) {
        if (region === 'capital') {
          getApiVenda();
        } else {
          if (recebidoNomes) {
            getApiVendaCity();
          }
        }
        setVenda(true);
      } else {
        if (region === 'capital') {
          getApiAluguel();
        } else {
          if (recebidoNomes) {
            getApiAluguelCity();
          }
        }
        setVenda(false);
      }
    }
  }, [error]);

  useEffect(() => {
    if (!recebido) {
      if (isSale === 0) {
        if (region === 'capital') {
          getApiVenda();
        } else {
          if (recebidoNomes) {
            getApiVendaCity();
          }
        }
        setVenda(true);
      } else {
        if (region === 'capital') {
          getApiAluguel();
        } else {
          if (recebidoNomes) {
            getApiAluguelCity();
          }
        }
        setVenda(false);
      }
    }
  }, [recebido, recebidoNomes]);

  const [listaNum, setListaNum] = useState([[true, true, false]]);
  const descriptionNum = ['Número de vendas:'];
  const descriptionNumExtra = [['Total', 'Casas', 'Apartamentos']];

  const [listaValor, setListaValor] = useState([[true, true]]);
  const descriptionValor = ['Valor médio de vendas:'];
  const descriptionValorExtra = [['Valor de venda', 'Valor por m²']];

  const [listaTipo, setListaTipo] = useState([
    [true, false, false],
    [true, true, false, false, false, false],
    [true, true, false, false, false],
  ]);
  const descriptionTipo = [
    'Tipo do imóvel',
    'Número de dormitórios:',
    'Número de garagens:',
  ];
  const descriptionTipoExtra = [
    ['Luxo', 'Médio', 'Simples'],
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

  const [listaNumAlug, setListaNumAlug] = useState([[true, false, false]]);
  const descriptionNumAlug = ['Número de alugueis:'];
  const descriptionNumAlugExtra = [['Total', 'Casas', 'Apartamentos']];

  const [listaValorAlug, setListaValorAlug] = useState([[true, true]]);
  const descriptionValorAlug = ['Valor médio de alugueis:'];
  const descriptionValorAlugExtra = [['Valor de aluguel', 'Valor por m²']];

  const [listaTipoAlug, setListaTipoAlug] = useState([
    [true, true, false, false, false, false],
    [true, true, false, false, false],
  ]);
  const descriptionTipoAlug = ['Número de dormitórios:', 'Número de garagens:'];
  const descriptionTipoAlugExtra = [
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
  var naoExibir;
  function grupoDeValores(api, listaInicial) {
    let apiT = api.map((itemApi) => {
      return apiGet.data[0][itemApi].map((item, index) => {
        let data = apiGet.data.map((valor, vIndex) => valor[itemApi][index]);
        return data;
      });
    });

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
  const [description, setDescription] = useState();
  const [descriptionExtra, setDescriptionExtra] = useState();
  const [lista, setLista] = useState();
  const [title, setTitle] = useState();
  const [parametrosApi, setParametrosApi] = useState();
  useEffect(() => {
    if (venda) {
      if (region !== 'capital') {
        setTitle([
          'Variação da média de preços (nobre):',
          'Variação da média de preços (centro):',
          'Variação da média de preços (outras Regiões):',
        ]);
        setLista([listaValor, listaValor, listaValor]);
        setDescription([descriptionValor, descriptionValor, descriptionValor]);
        setDescriptionExtra([
          descriptionValorExtra,
          descriptionValorExtra,
          descriptionValorExtra,
        ]);
        setParametrosApi([
          ['medNobre', 'medNobreM2'],
          ['medCentro', 'medCentroM2'],
          ['medOutros', 'medOutrosM2'],
        ]);
      } else {
        setTitle([
          'Variação de vendas:',
          'Variação da média de preços:',
          'Ocorrência por tipo do imóvel:',
        ]);
        setLista([listaNum, listaValor, listaTipo]);
        setDescription([descriptionNum, descriptionValor, descriptionTipo]);
        setDescriptionExtra([
          descriptionNumExtra,
          descriptionValorExtra,
          descriptionTipoExtra,
        ]);
        setParametrosApi([
          ['numeroVendas'],
          ['valorMedio', 'valorMedioM2'],
          ['vendaTipoImovel', 'numDorm', 'numGar'],
        ]);
      }
    } else {
      if (region === 'capital') {
        setTitle([
          'Variação de alugueis:',
          'Varição da média de preços:',
          'Ocorrência por tipo do imóvel:',
        ]);
        setLista([listaNumAlug, listaValorAlug, listaTipoAlug]);
        setDescription([
          descriptionNumAlug,
          descriptionValorAlug,
          descriptionTipoAlug,
        ]);
        setDescriptionExtra([
          descriptionNumAlugExtra,
          descriptionValorAlugExtra,
          descriptionTipoAlugExtra,
        ]);
        setParametrosApi([
          ['numeroAluguel'],
          ['valorMedio', 'valorMedioM2'],
          ['aluguelDorm', 'aluguelGar'],
        ]);
      } else {
        setTitle([
          'Variação da média de preços (nobre):',
          'Variação da média de preços (centro):',
          'Variação da média de preços (outras Regiões):',
        ]);
        setLista([listaValorAlug, listaValorAlug, listaValorAlug]);
        setDescription([
          descriptionValorAlug,
          descriptionValorAlug,
          descriptionValorAlug,
        ]);
        setDescriptionExtra([
          descriptionValorAlugExtra,
          descriptionValorAlugExtra,
          descriptionValorAlugExtra,
        ]);
        setParametrosApi([
          ['medNobre', 'medNobreM2'],
          ['medCentro', 'medCentroM2'],
          ['medOutros', 'medOutrosM2'],
        ]);
      }
    }
  }, [venda]);
  function RenderItem(props) {
    const [listaItem, setListaItem] = useState(lista[props.index]);
    const [modalConf, setModalConf] = useState(false);
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

  //.log(apiGet.data);
  return error ? (
    <Error />
  ) : !recebido ? (
    <Loading />
  ) : (
    <Container>
      <ConteinerSelect>
        <Description>Selecione a região: </Description>
        <ButtonRegion
          onPress={() => setSelectRegionVisible(!selectRegionVisible)}>
          <DescriptionButtonRegion>
            {regionSelected.name}
          </DescriptionButtonRegion>
        </ButtonRegion>
      </ConteinerSelect>
      <FlatList
        data={title}
        renderItem={({index}) => <RenderItem index={index} />}
        style={{backgroundColor: '#13131a'}}
        keyExtractor={(item, index) => index.toString()}
      />
      <SelectRegion
        modalVisible={selectRegionVisible}
        setModalVisible={setSelectRegionVisible}
        setRegion={setRegionSelected}
        region={regionSelected}
        lista={listaR}
      />
    </Container>
  );
  //});
  //    };
  //});
}
