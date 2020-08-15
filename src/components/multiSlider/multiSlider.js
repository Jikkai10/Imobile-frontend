import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomMarker from './CustomMarker';
import Item from './Item';

export default function CustomSlider({
  min,
  max,
  LRpadding,
  callback,
  selecionados,
  setSelecionados,
  lengthAno,
  setLength,
}) {
  const [multiSliderValue, setMultiSliderValue] = useState([min, max]);
  const [first, setFirst] = useState(min);
  const [second, setSecond] = useState(max);
  if (lengthAno === 0) {
    selecionados.push(first);

    setLength(selecionados.length);
  }

  if (selecionados.length === 1) {
    selecionados.push(second);
    setLength(selecionados.length);
  }
  useEffect(() => {
    selecionados[0] = first;
    setLength(first);
  }, [first]);

  useEffect(() => {
    selecionados[1] = second;
    setLength(second);
  }, [second]);

  return (
    <View>
      <View style={styles.columnTop}>{renderScalePar()}</View>
      <View style={styles.container}>
        <MultiSlider
          trackStyle={{backgroundColor: '#bdc3c7'}}
          selectedStyle={{backgroundColor: '#2473f0'}}
          markerStyle={{backgroundColor: '#00f'}}
          values={[multiSliderValue[0], multiSliderValue[1]]}
          sliderLength={Dimensions.get('window').width / 2.5}
          onValuesChange={multiSliderValuesChange}
          min={min}
          max={max}
          step={1}
          isMarkersSeparated={true}
          allowOverlap={false}
          snapped={true}
        />
      </View>
    </View>
  );

  function multiSliderValuesChange(values) {
    setMultiSliderValue(values);
    setFirst(values[0]);
    setSecond(values[1]);

    callback(values);
  }

  function renderScalePar() {
    const items = [];
    for (let i = min; i <= max; i++) {
      if (i === first || i === second) {
        items.push(
          <Item
            key={i}
            value={i}
            first={first}
            second={second}
            selecionados={selecionados}
            setSelecionados={setSelecionados}
            setLength={setLength}
          />,
        );
      }
    }
    return items;
  }
  function renderScaleImpar() {
    const items = [];
    for (let i = min; i <= max; i++) {
      if (i % 2 !== 0) {
        items.push(
          <Item
            value={i}
            first={first}
            second={second}
            selecionados={selecionados}
            setSelecionados={setSelecionados}
            setLength={setLength}
          />,
        );
      }
    }
    return items;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: -20,
    marginTop: -10,
  },
  columnDown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -20,
    marginLeft: 15,
    marginRight: 15,
  },
  active: {
    textAlign: 'center',
    //fontSize: 20,
    color: '#5e5e5e',
  },
  inactive: {
    textAlign: 'center',

    fontWeight: 'normal',
    color: '#bdc3c7',
  },
  line: {
    textAlign: 'center',
  },
});
