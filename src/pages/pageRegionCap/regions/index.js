import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  GraficoConteiner,
  Description,
  ConfiguracaoConteiner,
} from './style';
import Grafico from '../../../components/grafico';
import api from '../../../services/api';

function ordenarPorMes(a, b) {
  return a.mes - b.mes;
}

const a = ['a', 'b', 'c', 'd', 'e'];
export default function valRegiao({regiao, isSale, firstYear, lastYear}) {
  //return (function () {
  const [apiGet, setApiGet] = useState();
  const [recebido, setRecebido] = useState(false);

  async function getApiVenda() {
    let apiCap = await api.get(`/vendasRCap/agrupado/${firstYear}/${lastYear}`);
    setApiGet(apiCap);
  }

  async function getApiAluguel() {
    let apiCap = await api.get(`/aluguelRCap/ano/${firstYear}/${lastYear}`);
    setApiGet(apiCap);
  }
  useEffect(() => {
    setRecebido(false);
    setValoresRegiao(undefined);
    setValorPorcentagem(undefined);
  }, [isSale]);
  useEffect(() => {
    setRecebido(false);
    setValoresRegiao(undefined);
    setValorPorcentagem(undefined);
  }, [firstYear]);
  useEffect(() => {
    setRecebido(false);
    setValoresRegiao(undefined);
    setValorPorcentagem(undefined);
  }, [lastYear]);
  useEffect(() => {
    if (apiGet !== undefined) {
      setRecebido(true);
      /*apiGet.data.regiaoA.sort(ordenarPorMes);
      apiGet.data.regiaoB.sort(ordenarPorMes);
      apiGet.data.regiaoC.sort(ordenarPorMes);
      apiGet.data.regiaoD.sort(ordenarPorMes);
      apiGet.data.regiaoE.sort(ordenarPorMes);*/
    }
  }, [apiGet]);

  const [valoresRegiao, setValoresRegiao] = useState();
  const [valorPorcentagem, setValorPorcentagem] = useState();
  const [venda, setVenda] = useState();
  useEffect(() => {
    if (recebido) {
      
      if (regiao === 'Região A') {
        setValoresRegiao(apiGet.data.regiaoA);
      }
      if (regiao === 'Região B') {
        setValoresRegiao(apiGet.data.regiaoB);
      }
      if (regiao === 'Região C') {
        setValoresRegiao(apiGet.data.regiaoC);
      }
      if (regiao === 'Região D') {
        setValoresRegiao(apiGet.data.regiaoD);
      }
      if (regiao === 'Região E') {
        setValoresRegiao(apiGet.data.regiaoE);
      }
    } else if (isSale === 0) {
      getApiVenda();
      setVenda(true);
    } else {
      getApiAluguel();
      setVenda(false);
    }
  }, [recebido]);

  useEffect(() => {
    if (valoresRegiao !== undefined) {
      if(isSale === 0){
        setValorPorcentagem(valorParaPorcentagem(valoresRegiao));
      }else{
        setValorPorcentagem(1);
      }
    }
  }, [valoresRegiao]);

  function valorParaPorcentagem(api) {
    let valorInicial = api[0].numeroVendas[0];
    let valoresPorcentagem = api.map(
      (item, index) => (item.numeroVendas[0] * 100) / valorInicial - 100,
    );
    
    return valoresPorcentagem;
  }

  //console.log(valoresRegiao);
  return !recebido ||
    valoresRegiao === undefined ||
    valorPorcentagem === undefined ? (
    <View></View>
  ) : venda ? (
    <Container>
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
              data: valorPorcentagem,
              color: () => '#00f',
            },
          ]}
          labels={valoresRegiao.map((item, index) => item.ano)}
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
              data: valoresRegiao.map((item, index) => item.valorMedio),
              color: () => '#00f',
            },
          ]}
          labels={valoresRegiao.map((item, index) => item.ano)}
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
              data: valoresRegiao.map((item, index) => item.vendaTipoImovel[0]),
              color: () => '#00f',
            },
            {
              data: valoresRegiao.map((item, index) => item.vendaTipoImovel[1]),
              color: () => '#f00',
            },
            {
              data: valoresRegiao.map((item, index) => item.vendaTipoImovel[2]),
              color: () => '#000',
            },
          ]}
          labels={valoresRegiao.map((item, index) => item.ano)}
          legenda={['luxo', 'medio', 'standard']}
          sufixo="%"
        />
      </GraficoConteiner>
    </Container>
  ) : (
    <Container>
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
              data: valoresRegiao.map(
                (item, index) => item.numeroAluguel[0]*100/valoresRegiao[0].numeroAluguel[0] -100,
              ),
              color: () => '#00f',
            },
          ]}
          labels={valoresRegiao.map((item, index) => item.ano)}
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
              data: valoresRegiao.map((item, index) => item.valorMedio),
              color: () => '#00f',
            },
          ]}
          labels={valoresRegiao.map((item, index) => item.ano)}
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
              data: valoresRegiao.map((item, index) => item.aluguelDorm[0]),
              color: () => '#00f',
            },
            {
              data: valoresRegiao.map((item, index) => item.aluguelDorm[1]),
              color: () => '#f00',
            },
            {
              data: valoresRegiao.map((item, index) => item.aluguelDorm[2]),
              color: () => '#000',
            },
            {
              data: valoresRegiao.map((item, index) => item.aluguelDorm[3]),
              color: () => '#ff8200',
            },
          ]}
          labels={valoresRegiao.map((item, index) => item.ano)}
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
