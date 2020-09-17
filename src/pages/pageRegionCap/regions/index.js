import React, {useState, useEffect,useRef} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ConteinerSelect,
  ButtonRegion,
  DescriptionButtonRegion,
  Configuracao,
} from './style';
import {Container,GraficoConteiner,Description,ConfiguracaoConteiner} from '../style';
import ModalConfGrafico from '../../../components/modalConfGrafico';
import Legenda from '../../../components/legenda';
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

  const selectRegionVisible = useRef(null);
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

  const modalConf1 = useRef(null);
  const modalConf2 = useRef(null);
  const modalConf3 = useRef(null);
  const modalConf4 = useRef(null);
  const modalConf5 = useRef(null);
  const modalConf6 = useRef(null);

  const [listaNum, setListaNum] = useState([
    [true, true, false]
  ]);
  const descriptionNum = ['Número de vendas:'];
  const descriptionNumExtra = [
    [
      'Total',
      'Casas',
      'Apartamentos',
    ],
  ];

  const [listaValor, setListaValor] = useState([
    [true, true]
  ]);
  const descriptionValor = ['Valor médio de vendas:'];
  const descriptionValorExtra = [
    [
      'Valor de venda',
      'Valor por m²',
    ],
  ];

  const [listaTipo, setListaTipo] = useState([
    [true,false,false],
    [true, true, false, false, false, false],
    [true, true, false, false, false],
  ]);
  const descriptionTipo = ['Tipo do imóvel','Número de dormitórios:','Número de garagens:'];
  const descriptionTipoExtra = [
    [
      'Luxo',
      'Médio',
      'Simples'
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


  const [listaNumAlug, setListaNumAlug] = useState([
    [true, false, false]
  ]);
  const descriptionNumAlug = ['Número de alugueis:'];
  const descriptionNumAlugExtra = [
    [
      'Total',
      'Casas',
      'Apartamentos',
    ],
  ];

  const [listaValorAlug, setListaValorAlug] = useState([
    [true, true]
  ]);
  const descriptionValorAlug = ['Valor médio de alugueis:'];
  const descriptionValorAlugExtra = [
    [
      'Valor de aluguel',
      'Valor por m²',
    ],
  ];

  const [listaTipoAlug, setListaTipoAlug] = useState([
    [true, true, false, false, false, false],
    [true, true, false, false, false],
  ]);
  const descriptionTipoAlug = ['Número de dormitórios:','Número de garagens:'];
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

  function grupoDeValores(api,listaInicial) {
    let apiT = api.map((itemApi) =>{ 
      
      return apiGet.data[0][itemApi].map((item, index) => {
        let data = apiGet.data.map((valor, vIndex) => valor[itemApi][index]);
        return data;
      })
    }
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

  //console.log(apiGet.data);
  return !recebido ? (
    <Loading/>
  ) : venda ? (
    <Container>
      <ConteinerSelect>
        <Description>Selecione a região: </Description>
        <ButtonRegion onPress={() => selectRegionVisible.current?.open()}>
          <DescriptionButtonRegion>{regionSelected.name}</DescriptionButtonRegion>
        </ButtonRegion>
        
      </ConteinerSelect>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Variação de vendas:</Description>
          <Configuracao onPress={() => modalConf1.current?.open()}>
            <Icon name="cog" size={20} color="#fff" />
          </Configuracao>

          <ModalConfGrafico
            visible={modalConf1}
            listaRecebida={listaNum}
            setLista={setListaNum}
            description={descriptionNum}
            descriptionExtra={descriptionNumExtra}
          />
        </ConfiguracaoConteiner>
        <Legenda
          colors={colors}
          values={ajeitaDescription(descriptionNumExtra, listaNum)}
          valuesTipo={descriptionNum}
        />
        <Grafico
          data={apiGet.data[0].numeroVendas
            .map((item, index) => {
              let data = {
                data: apiGet.data.map(
                  (valor, vIndex) =>
                    (valor.numeroVendas[index] * 100) /
                      apiGet.data[0].numeroVendas[index] -
                    100,
                ),
                color: () => colors[index],
              };

              return data;
            })
            .filter((value, index) => {
              return listaNum[0][index];
            })}
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo="%"
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Média de preços:</Description>
          <Configuracao onPress={() => modalConf2.current?.open()}>
            <Icon name="cog" size={20} color="#fff" />
          </Configuracao>
          <ModalConfGrafico
            visible={modalConf2}
            listaRecebida={listaValor}
            setLista={setListaValor}
            description={descriptionValor}
            descriptionExtra={descriptionValorExtra}
          />
        </ConfiguracaoConteiner>
        <Legenda
          colors={colors}
          values={ajeitaDescription(descriptionValorExtra, listaValor)}
          valuesTipo={descriptionValor}
        />
        <Grafico
          data={grupoDeValores(['valorMedio','valorMedioM2'],listaValor)}
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo=""
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
      <SelectRegion
          modalVisible={selectRegionVisible}
          setRegion={setRegionSelected}
          lista={lista}
        />
    </Container>
    
  ) : (
    <Container>
      <ConteinerSelect>
        <Description>Selecione a região: </Description>
        <ButtonRegion onPress={() => selectRegionVisible.current?.open()}>
          <DescriptionButtonRegion>{regionSelected.name}</DescriptionButtonRegion>
        </ButtonRegion>
        <SelectRegion
          modalVisible={selectRegionVisible}
          setRegion={setRegionSelected}
          lista={lista}
        />
      </ConteinerSelect>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Variação de alugueis:</Description>
          <Configuracao onPress={() => modalConf4.current?.open()}>
            <Icon name="cog" size={20} color="#fff" />
          </Configuracao>

          <ModalConfGrafico
            visible={modalConf4}
            listaRecebida={listaNumAlug}
            setLista={setListaNumAlug}
            description={descriptionNumAlug}
            descriptionExtra={descriptionNumAlugExtra}
          />
        </ConfiguracaoConteiner>
        <Legenda
          colors={colors}
          values={ajeitaDescription(descriptionNumAlugExtra, listaNumAlug)}
          valuesTipo={descriptionNumAlug}
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
              return listaNumAlug[0][index];
            })}
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo="%"
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Média de preços:</Description>
          <Configuracao onPress={() => modalConf5.current?.open()}>
            <Icon name="cog" size={20} color="#fff" />
          </Configuracao>
          <ModalConfGrafico
            visible={modalConf5}
            listaRecebida={listaValorAlug}
            setLista={setListaValorAlug}
            description={descriptionValorAlug}
            descriptionExtra={descriptionValorAlugExtra}
          />
        </ConfiguracaoConteiner>
        <Legenda
          colors={colors}
          values={ajeitaDescription(descriptionValorAlugExtra, listaValorAlug)}
          valuesTipo={descriptionValorAlug}
        />
        <Grafico
          data={grupoDeValores(['valorMedio','valorMedioM2'],listaValorAlug)}
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo=""
        />
      </GraficoConteiner>
      <GraficoConteiner>
        <ConfiguracaoConteiner>
          <Description>Ocorrência por número de dormitórios:</Description>
          <Configuracao onPress={() => modalConf6.current?.open()}>
            <Icon name="cog" size={20} color="#fff" />
          </Configuracao>
          <ModalConfGrafico
            visible={modalConf6}
            listaRecebida={listaTipoAlug}
            setLista={setListaTipoAlug}
            description={descriptionTipoAlug}
            descriptionExtra={descriptionTipoAlugExtra}
          />
        </ConfiguracaoConteiner>
        <Legenda
          colors={colors}
          values={ajeitaDescription(descriptionTipoAlugExtra, listaTipoAlug)}
          valuesTipo={descriptionTipoAlug}
        />
        <Grafico
          data={grupoDeValores(['aluguelDorm','aluguelGar'],listaTipoAlug)}
          labels={apiGet.data.map((item, index) => item.ano)}
          sufixo="%"
        />
      </GraficoConteiner>
    </Container>
  );
  //});
  //    };
  //});
}
