import React, {useState, useEffect} from 'react';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {LineChart} from 'react-native-chart-kit';
import {StyleSheet, View, Dimensions, Modal, Text} from 'react-native';
import ModalGrafico from '../modalGrafico';
import {ModalContainer} from '../../pages/pageRegionCap/regions/style';

export default function grafico({labels, data, legenda, sufixo = '',naoExibir}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [ano, setAno] = useState();
  const [color, setColor] = useState();
  const [valor, setValor] = useState();
  
  return (
    <>
      <LineChart
        data={{
          labels: labels,
          datasets: data,
          legend: legenda,
          
        }}
        
        /*formatYLabel={(value) => {
          if (yPrefixo === '') {
            return value;
          } else {
            let val = value / 1000;
            return `${val.toFixed(0)} K`;
          }
        }}*/
        width={Dimensions.get('window').width }
        height={300}
        verticalLabelRotation={70}
        yAxisSuffix={sufixo}
        formatYLabel={(yValue) => {
          
          if(yValue == -100){
            return 'N/A';
          }
          return yValue;
        }}
        //yAxisLabel={yPrefixo}
        //yLabelsOffset={5}
        
        chartConfig={{
          backgroundColor: '#13131a',
          backgroundGradientFrom: '#13131a',
          backgroundGradientTo: '#13131a',
          
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgb(255,255,255)`,
          labelColor: () => `#fff`,
          propsForLabels: {fontWeight: 'bold'},
          style: {borderRadius: 16},
          propsForDots: {r: '6', strokeWidth: '2', stroke: '#000'},
          
        }}
        onDataPointClick={({value, index, getColor}) => {
          setModalVisible(true);
          setAno(labels[index]);
          setColor(getColor(1));
          setValor(value);
        }}
        withShadow={false}
        fromZero={false}
        bezier
        style={styles.containerGrafico}
      />
      <ModalGrafico
        ano={ano}
        valor={valor}
        color={color}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        sufixo={sufixo}
      />
    </>
  );
}

const styles = StyleSheet.create({
  containerGrafico: {
    marginVertical: 5,
    borderRadius: 15,
    margin: 0,
  },
});
