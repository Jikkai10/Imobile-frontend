import React, {useState} from 'react';
import {View} from 'react-native';

import {Circle, CheckedCircle} from './styles';

function RadioButton({checked, setChecked, last}) {
  return (
    <Circle
      style={{borderColor: checked ? '#000' : '#999'}}
      onPress={() => {
        if(!last){
          setChecked(!checked);
        }else{
          setChecked(true);
        }
      }}>
      {checked ? (
        <CheckedCircle style={{backgroundColor: checked ? '#000' : '#999'}} />
      ) : (
        <View />
      )}
    </Circle>
  );
}

export default RadioButton;
