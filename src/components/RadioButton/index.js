import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {Circle, CheckedCircle} from './styles';

function RadioButton({checked, setChecked, last, setShowLastMensag}) {
  return (
    <Circle
      style={{borderColor: checked ? '#fff' : '#aaa'}}
      onPress={() => {
        if (!last) {
          setChecked(!checked);
        } else if (checked) {
          setShowLastMensag(true);
        } else {
          setChecked(true);
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
