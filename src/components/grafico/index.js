import React, {useState, useEffect} from 'react';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {LineChart} from 'react-native-chart-kit';
import {StyleSheet, View, Dimensions, Modal, Text} from 'react-native';
import ModalGrafico from '../modalGrafico';

export default function grafico({
  labels,
  data,
  ySufixo,
  yPrefixo,
  legenda,
  anoValorFilter,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [ano, setAno] = useState();
  const [color, setColor] = useState();
  const [anoAnterior, setAnoAnterior] = useState();
  const [tipo, setTipo] = useState();
  const [valor, setValor] = useState();
  const [porcentagem, setPorcentagem] = useState();

  return (
    <View>
      <LineChart
        data={{
          labels: labels,
          datasets: data,
          legend: legenda,
        }}
        formatYLabel={(value) => {
          if (yPrefixo === '') {
            return value;
          } else {
            let val = value / 1000;
            return `${val.toFixed(0)} K`;
          }
        }}
        width={Dimensions.get('window').width * 0.97}
        height={300}
        verticalLabelRotation={70}
        yAxisSuffix={ySufixo}
        yAxisLabel={yPrefixo}
        yLabelsOffset={5}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgb(0,0,0)`,
          labelColor: () => `#000`,
          propsForLabels: {fontWeight: 'bold'},
          style: {borderRadius: 16},
          propsForDots: {r: '6', strokeWidth: '2', stroke: '#fff'},
        }}
        onDataPointClick={({value, index, getColor}) => {
          setModalVisible(true);
          setAno(labels[index]);
          setColor(getColor(1));
          if (yPrefixo === '') {
            setTipo(2);
            if (labels[0] === labels[labels.lenght - 1]) {
              setValor(0);
              showMessage({
                message: `Crecimento de 0 %`,
                backgroundColor: getColor(0.9),
              });
            } else if (
              labels[index] === labels[0] ||
              labels[index] === labels[1]
            ) {
              setValor(value);
              showMessage({
                message: `Crecimento de ${value} %`,
                backgroundColor: getColor(0.9),
              });
            } else {
              let valor = anoValorFilter[index].data * 100;
              valor /= anoValorFilter[index - 1].data;
              valor -= 100;
              setTipo(3);
              setValor(value);
              setPorcentagem(valor.toFixed(2));
              setAnoAnterior(labels[index - 1]);
              showMessage({
                message: `Crecimento de ${value} %`,
                description: `${valor.toFixed(2)} % em relação a ${
                  labels[index - 1]
                }`,
                backgroundColor: getColor(0.9),
              });
            }
          } else {
            setValor(value);
            setTipo(1);
            showMessage({
              message: `R$ ${value}`,
              description: `Média das vendas de ${labels[index]}`,
              backgroundColor: getColor(0.9),
            });
          }
        }}
        withShadow={false}
        fromZero={false}
        bezier
        style={styles.containerGrafico}
      />
      <ModalGrafico
        valor={valor}
        ano={ano}
        porcentagem={porcentagem}
        anoAnterior={anoAnterior}
        tipo={tipo}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        color={color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerGrafico: {
    marginVertical: 5,
    borderRadius: 15,
    margin: 0,
  },
});
