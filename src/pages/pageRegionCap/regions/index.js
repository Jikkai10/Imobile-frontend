import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, GraficoConteiner, Description, ConfiguracaoConteiner} from './style';
import Grafico from '../../../components/grafico';
import api from '../../../services/api';

function ordenarPorMes(a, b) {
  return a.mes - b.mes;
}

const a = ['a', 'b', 'c', 'd', 'e'];
export default function valRegiao({route}) {
  //return (function () {
  const [apiGet, setApiGet] = useState();
  const [recebido, setRecebido] = useState(false);

  async function getApi() {
    let apiCap = await api.get('/vendasRCap/agrupado');
    setApiGet(apiCap);
  }

  useEffect(() => {
    if (apiGet === undefined) {
      getApi();
    } else {
      setRecebido(true);
      
      /*apiGet.data.regiaoA.sort(ordenarPorMes);
      apiGet.data.regiaoB.sort(ordenarPorMes);
      apiGet.data.regiaoC.sort(ordenarPorMes);
      apiGet.data.regiaoD.sort(ordenarPorMes);
      apiGet.data.regiaoE.sort(ordenarPorMes);*/
    }
  }, [apiGet]);
  
  const [valoresRegiao, setValoresRegiao] = useState();
  const [valorPorcentagem,setValorPorcentagem] = useState();

  useEffect(() => {
    if (recebido) {
      if (route.name === 'Região A') {
        setValoresRegiao(apiGet.data.regiaoA);
      }
      if (route.name === 'Região B') {
        setValoresRegiao(apiGet.data.regiaoB);
      }
      if (route.name === 'Região C') {
        setValoresRegiao(apiGet.data.regiaoC);
      }
      if (route.name === 'Região D') {
        setValoresRegiao(apiGet.data.regiaoD);
      }
      if (route.name === 'Região E') {
        setValoresRegiao(apiGet.data.regiaoE);
      }
      
    }
  }, [recebido]);

  useEffect(()=>{
    if(valoresRegiao !== undefined){
      setValorPorcentagem(valorParaPorcentagem(valoresRegiao));
    }
  },[valoresRegiao]);

  function valorParaPorcentagem(api){
    let valorInicial = api[0].numeroVendas[0];
    let valoresPorcentagem = api.map((item,index)=> item.numeroVendas[0]*100/valorInicial - 100);
    console.log(valoresPorcentagem);
    return valoresPorcentagem;
  }

  //console.log(valoresRegiao);
  return !recebido || valoresRegiao === undefined || valorPorcentagem === undefined? (
    <View></View>
  ) : (
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
          sufixo='%'
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
              data: valoresRegiao.map(
                (item, index) => item.vendaTipoImovel[0],
              ),
              color: () => '#00f',
            },
            {
              data: valoresRegiao.map(
                (item, index) => item.vendaTipoImovel[1],
              ),
              color: () => '#f00',
            },
            {
              data: valoresRegiao.map(
                (item, index) => item.vendaTipoImovel[2],
              ),
              color: () => '#000',
            },
          ]}
          labels={valoresRegiao.map((item, index) => item.ano)}
          legenda={['luxo', 'medio', 'standard']}
          sufixo='%'
        />
      </GraficoConteiner>
    </Container>
  );
  //});
  //    };
  //});
}
