import React from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';

export default function infoComp({
  tipoDados,
  bairros,
  valueGrafico,
  valueGraficoExtra,
  anoValue,
  valueGrafico2,
  anoValue2,
}) {
  if (tipoDados === 0) {
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
            <Text style={styles.textInfo}>
              Bairro: {maior(valueGrafico, valueGrafico2, bairros).bairro}
            </Text>
            <Text style={styles.textInfo}>
              Valor: R$ {maior(valueGrafico, valueGrafico2, bairros).valor}
            </Text>
            <Text style={styles.textInfo}>
              Ano: {maiorAno(valueGrafico, valueGrafico2)}
            </Text>
          </View>
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>Menor média de vendas </Text>
          <View style={styles.containerInfo}>
            <Text style={styles.textInfo}>
              Bairro: {menor(valueGrafico, valueGrafico2, bairros).bairro}
            </Text>
            <Text style={styles.textInfo}>
              Valor: R$ {menor(valueGrafico, valueGrafico2, bairros).valor}
            </Text>
            <Text style={styles.textInfo}>
              Ano: {menorAno(valueGrafico, valueGrafico2)}
            </Text>
          </View>
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>
            Maior diferença de valores no mesmo ano
          </Text>
          <View style={styles.containerInfo}>
            <Text style={styles.textInfo}>
              Diferença: R$ {diferençaValor(valueGrafico, valueGrafico2).dif}
            </Text>
            <Text style={styles.textInfo}>
              {bairros[0]}: R$ {diferençaValor(valueGrafico, valueGrafico2).bairro1}
            </Text>
            <Text style={styles.textInfo}>
              {bairros[1]}: R$ {diferençaValor(valueGrafico, valueGrafico2).bairro2}
            </Text>
            <Text style={styles.textInfo}>
              Ano: {diferençaValor(valueGrafico, valueGrafico2).ano}
            </Text>
          </View>
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>Maior média geral</Text>
          <View style={styles.containerInfo}>
            <Text style={styles.textInfo}>
              Bairro: {media(valueGrafico, valueGrafico2, bairros).bairro}
            </Text>
            <Text style={styles.textInfo}>
              Média: R$ {media(valueGrafico, valueGrafico2, bairros).media}
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
              Bairro: {maior(valueGrafico, valueGrafico2, bairros).bairro}
            </Text>
            <Text style={styles.textInfo}>
              Porcentagem: {maior(valueGrafico, valueGrafico2, bairros).valor}%
            </Text>
            <Text style={styles.textInfo}>
              Ano: {maiorAno(valueGrafico, valueGrafico2)}
            </Text>
          </View>
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>
            Menor porcentagem de crescimento{' '}
          </Text>
          <View style={styles.containerInfo}>
            <Text style={styles.textInfo}>
              Bairro: {menor(valueGrafico, valueGrafico2, bairros).bairro}
            </Text>
            <Text style={styles.textInfo}>
              Porcentagem: {menor(valueGrafico, valueGrafico2, bairros).valor}%
            </Text>
            <Text style={styles.textInfo}>Ano: {menorAno(valueGrafico,valueGrafico2)}</Text>
          </View>
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>Maior diferença de crescimento no mesmo ano</Text>
          <View style={styles.containerInfo}>
          <Text style={styles.textInfo}>
              Diferença: {diferençaValor(valueGrafico, valueGrafico2).dif}%
            </Text>
            <Text style={styles.textInfo}>
              {bairros[0]}:{' '}
              {diferençaValor(valueGrafico, valueGrafico2).bairro1}%
            </Text>
            <Text style={styles.textInfo}>
              {bairros[1]}:{' '}
              {diferençaValor(valueGrafico, valueGrafico2).bairro2}%
            </Text>
            <Text style={styles.textInfo}>
              Ano: {diferençaValor(valueGrafico, valueGrafico2).ano}
            </Text>
          </View>
        </View>
        <View style={{height: 20}}></View>
      </View>
    );
  }
}

function media(valueGrafico, valueGrafico2, bairros) {
  let valores = valueGrafico.map((item) => item.data);
  let soma = 0;
  for (let i in valores) {
    soma += valores[i];
  }
  let media = soma / valores.length;

  let valores2 = valueGrafico2.map((item) => item.data);
  let soma2 = 0;
  for (let j in valores2) {
    soma2 += valores2[j];
  }
  let media2 = soma2 / valores2.length;
  let maiorMedia = 0;
  if (media > media2) {
    maiorMedia = {media: media.toFixed(2), bairro: bairros[0]};
  } else {
    maiorMedia = {media: media2.toFixed(2), bairro: bairros[1]};
  }
  return maiorMedia;
}

function diferençaValor(valueGrafico, valueGrafico2) {
  let diferença = valueGrafico.map((item, index) => {
    let dif = valueGrafico[index].data - valueGrafico2[index].data;

    return {
      dif: Math.abs(dif),
      ano: item.label,
      bairro1: valueGrafico[index].data,
      bairro2: valueGrafico2[index].data,
    };
  });

  let diferençaValor = diferença.map((item) => item.dif);
  let maior = Math.max.apply(Math, diferençaValor);
  let maiorDif = diferença.find((item) => item.dif === maior);

  return maiorDif;
}

function maior(valueGrafico, valueGrafico2, bairros) {
  let maior = valueGrafico.map((item, index) => item.data);
  maior = Math.max.apply(Math, maior);
  let maior2 = valueGrafico2.map((item, index) => item.data);
  maior2 = Math.max.apply(Math, maior2);
  if (maior > maior2) {
    return {valor: maior, bairro: bairros[0]};
  } else {
    return {valor: maior2, bairro: bairros[1]};
  }
}

function maiorAno(valueGrafico, valueGrafico2) {
  let maior = valueGrafico.map((item, index) => item.data);
  maior = Math.max.apply(Math, maior);
  let maior2 = valueGrafico2.map((item, index) => item.data);
  maior2 = Math.max.apply(Math, maior2);
  let maiorAno;
  if (maior > maior2) {
    maiorAno = valueGrafico.filter((item) => item.data == maior);
  } else {
    maiorAno = valueGrafico2.filter((item) => item.data == maior2);
  }

  var total = '';
  for (var item of maiorAno) {
    if (item === maiorAno[maiorAno.length - 1]) {
      total += `${item.label}`;
    } else {
      total += `${item.label}/`;
    }
  }
  return total;
}

function menor(valueGrafico, valueGrafico2, bairros) {
  let menor = valueGrafico.map((item) => item.data);
  menor = Math.min.apply(Math, menor);
  let menor2 = valueGrafico2.map((item) => item.data);
  menor2 = Math.min.apply(Math, menor2);
  if (menor < menor2) {
    return {valor: menor, bairro: bairros[0]};
  } else {
    return {valor: menor2, bairro: bairros[1]};
  }
}

function menorAno(valueGrafico, valueGrafico2) {
  let menor = valueGrafico.map((item) => item.data);
  menor = Math.min.apply(Math, menor);
  let menor2 = valueGrafico2.map((item) => item.data);
  menor2 = Math.min.apply(Math, menor2);
  let menorAno;
  if (menor < menor2) {
    menorAno = valueGrafico.filter((item) => item.data == menor);
  } else {
    menorAno = valueGrafico2.filter((item) => item.data == menor2);
  }

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
