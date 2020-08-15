import React from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
export default function infoGrafico({
  valueGrafico,
  tipoDados,
  valueGraficoExtra,
  anoValue,
}) {
  if (valueGraficoExtra.ySufixo === '') {
    return (
      <View style={{width: Dimensions.get('window').width}}>
        <View style={styles.containerTitle}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>
            Principais Informações
          </Text>
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>Maior média de vendas </Text>
          <View style={styles.containerInfo}>
            <Text style={styles.textInfo}>Valor: R$ {maior(valueGrafico)}</Text>
            <Text style={styles.textInfo}>Ano: {maiorAno(valueGrafico)}</Text>
          </View>
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>Menor média de vendas </Text>
          <View style={styles.containerInfo}>
            <Text style={styles.textInfo}>Valor: R$ {menor(valueGrafico)}</Text>
            <Text style={styles.textInfo}>Ano: {menorAno(valueGrafico)}</Text>
          </View>
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>
            Maior diferença de valores entre 2 anos
          </Text>
          <View style={styles.containerInfo}>
            <Text style={styles.textInfo}>
              Diferença: R$ {diferençaValor(valueGrafico).dif}
            </Text>
            <Text style={styles.textInfo}>
              Anos: {diferençaValor(valueGrafico).ano1} ={">"} {' '}
              {diferençaValor(valueGrafico).ano2}
            </Text>
          </View>
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>Média geral</Text>
          <View style={styles.containerInfo}>
            <Text style={styles.textInfo}>Média: R$ {media(valueGrafico)}</Text>
          </View>
        </View>
        <View style={{height: 20}}></View>
      </View>
    );
  } else {
    if (valueGrafico.length === 1) {
      return (
        <View style={{width: Dimensions.get('window').width}}>
          <View style={styles.containerTitle}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>
              Principais Informações
            </Text>
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>
              Maior porcentagem de crescimento{' '}
            </Text>
            <View style={styles.containerInfo}>
              <Text style={styles.textInfo}>Porcentagem: 0 %</Text>
              <Text style={styles.textInfo}>Ano: {valueGrafico[0].label} </Text>
            </View>
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>
              Menor porcentagem de crescimento{' '}
            </Text>
            <View style={styles.containerInfo}>
              <Text style={styles.textInfo}>Porcentagem: 0 %</Text>
              <Text style={styles.textInfo}>Ano: {valueGrafico[0].label}</Text>
            </View>
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>Maior crescimento entre 2 anos</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.textInfo}>Crescimento: 0 %</Text>
              <Text style={styles.textInfo}>
                Anos: {valueGrafico[0].label} ={">"} {valueGrafico[0].label}
              </Text>
            </View>
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>Maior decaimento entre 2 anos</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.textInfo}>Decaimento: 0 %</Text>
              <Text style={styles.textInfo}>
                Anos: {valueGrafico[0].label} ={">"} {valueGrafico[0].label}
              </Text>
            </View>
          </View>
          <View style={{height: 20}}></View>
        </View>
      );
    } else {
      return (
        <View style={{width: Dimensions.get('window').width}}>
          <View style={styles.containerTitle}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>
              Principais Informações
            </Text>
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>
              Maior porcentagem de crescimento{' '}
            </Text>
            <View style={styles.containerInfo}>
              <Text style={styles.textInfo}>
                Porcentagem: {maior(valueGrafico)}%
              </Text>
              <Text style={styles.textInfo}>Ano: {maiorAno(valueGrafico)}</Text>
            </View>
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>
              Menor porcentagem de crescimento{' '}
            </Text>
            <View style={styles.containerInfo}>
              <Text style={styles.textInfo}>
                Porcentagem: {menor(valueGrafico)}%
              </Text>
              <Text style={styles.textInfo}>Ano: {menorAno(valueGrafico)}</Text>
            </View>
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>Maior crescimento entre 2 anos</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.textInfo}>
                Crescimento: {decaimento(anoValue)[1].dif}%
              </Text>
              <Text style={styles.textInfo}>
                Anos: {decaimento(anoValue)[1].ano1} ={">"}{' '}
                {decaimento(anoValue)[1].ano2}
              </Text>
            </View>
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>Maior decaimento entre 2 anos</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.textInfo}>
                Decaimento: {decaimento(anoValue)[0].dif}%
              </Text>
              <Text style={styles.textInfo}>
                Anos: {decaimento(anoValue)[0].ano1} ={">"}{' '}
                {decaimento(anoValue)[0].ano2}
              </Text>
            </View>
          </View>
          <View style={{height: 20}}></View>
        </View>
      );
    }
  }
}
function media(valueGrafico) {
  let valores = valueGrafico.map((item) => item.data);
  let soma = 0;
  for (let i in valores) {
    soma += valores[i];
  }
  let media = soma / valores.length;
  return media.toFixed(2);
}

function decaimento(anoValue) {
  let diferença = anoValue.map((item, index) => {
    if (item === anoValue[anoValue.length - 1]) {
      return {
        dif: 0,
        ano1: anoValue[anoValue.length - 1].label,
        ano2: anoValue[anoValue.length - 1].label,
      };
    }
    let dif = anoValue[index + 1].data * 100;
    dif /= anoValue[index].data;
    dif -= 100;
    return {
      dif: dif,
      ano1: item.label,
      ano2: anoValue[index + 1].label,
    };
  });
  let diferençaValor = diferença.map((item) => {
    if (item === diferença[diferença.length - 1]) {
      return 0;
    }
    return item.dif;
  });
  let menor = Math.min.apply(Math, diferençaValor);
  let menorDif = diferença.find((item) => item.dif === menor);
  menorDif.dif = Math.abs(menorDif.dif);
  menorDif.dif = menorDif.dif.toFixed(2);

  let maior = Math.max.apply(Math, diferençaValor);
  let maiorDif = diferença.find((item) => item.dif === maior);
  maiorDif.dif = Math.abs(maiorDif.dif);
  maiorDif.dif = maiorDif.dif.toFixed(2);
  return [menorDif, maiorDif];
}

function diferençaValor(valueGrafico, tipoDados) {
  let diferença = valueGrafico.map((item, index) => {
    if (item === valueGrafico[valueGrafico.length - 1]) {
      return {
        dif: 0,
        ano1: 2020,
        ano2: 2020,
      };
    }
    let dif = valueGrafico[index + 1].data - item.data;
    if (tipoDados === 1) {
      return {
        dif: dif,
        ano1: item.label,
        ano2: valueGrafico[index + 1].label,
      };
    }
    return {
      dif: Math.abs(dif),
      ano1: item.label,
      ano2: valueGrafico[index + 1].label,
    };
  });
  let diferençaValor = diferença.map((item) => item.dif);
  let maior = Math.max.apply(Math, diferençaValor);
  let maiorDif = diferença.find((item) => item.dif === maior);
  return maiorDif;
}

function menor(valueGrafico) {
  let menor = valueGrafico.map((item) => item.data);
  menor = Math.min.apply(Math, menor);
  return menor;
}

function menorAno(valueGrafico) {
  let menor = valueGrafico.map((item) => item.data);
  menor = Math.min.apply(Math, menor);
  let menorAno = valueGrafico.filter((item) => item.data == menor);
  var total = '';
  for (var item of menorAno) {
    if (item === menorAno[menorAno.length - 1]) {
      total += `${item.label}`;
    } else {
      total += `${item.label}/`;
    }
  }

  return total;
}

function maior(valueGrafico) {
  let maior = valueGrafico.map((item, index) => item.data);
  maior = Math.max.apply(Math, maior);
  return maior;
}

function maiorAno(valueGrafico) {
  let maior = valueGrafico.map((item, index) => item.data);
  maior = Math.max.apply(Math, maior);
  maior = valueGrafico.filter((item) => item.data == maior);
  var total = '';
  for (var item of maior) {
    if (item === maior[maior.length - 1]) {
      total += `${item.label}`;
    } else {
      total += `${item.label}/`;
    }
  }
  return total;
}

const styles = StyleSheet.create({
  textTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInfo: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerInfo: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  containerTitle: {
    alignItems: 'center',
    marginTop: 20,
  },
});
