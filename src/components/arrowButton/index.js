import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Arrow } from './styles';

const arrowButton = ({checked,setChecked}) => {
  return (
    <Arrow
    style={{borderColor: checked ? '#fff' : '#aaa'}}
    onPress={() => {
        setChecked(!checked);
    }}>
    {checked ? (
      <Icon name="chevron-down" size={10} color="#fff" />
    ) : (
        <Icon name="chevron-right" size={10} color="#fff" />
    )}
  </Arrow>
  );
}

export default arrowButton;