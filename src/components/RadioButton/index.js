import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {Circle, CheckedCircle} from './styles';

function RadioButton({checked, setChecked, last, setShowLastMensag, max}) {
  return (
    <Circle
      style={{borderColor: checked ? '#fff' : '#aaa'}}
      onPress={() => {
        if (!last && !max) {
          setChecked(!checked);
        } else if(last && checked || max && !checked){
          setShowLastMensag(true);
        } else {
          setChecked(!checked);
        }
      }}>
      {checked ? (
        <CheckedCircle style={{backgroundColor: checked ? '#fff' : '#aaa'}} />
      ) : (
        <View />
      )}
    </Circle>
  );
}

export default RadioButton;
