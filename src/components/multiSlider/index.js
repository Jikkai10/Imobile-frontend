import React, {useState, useEffect} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import CustomSlider from './multiSlider';

export default function MSlider({
  selecionados,
  setSelecionados,
  lengthAno,
  setLength,
}) {
  const [multiSliderValues, setMultiSliderValues] = useState([]);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <CustomSlider
        min={2010}
        max={2020}
        LRpadding={100}
        callback={multiSliderValueCallback}
        selecionados={selecionados}
        setSelecionados={setSelecionados}
        setLength={setLength}
        lengthAno={lengthAno}
      />
    </View>
  );

  function multiSliderValueCallback(values) {
    setMultiSliderValues(values);
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 20,
    fontSize: 18,
  },
});
