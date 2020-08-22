import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
    background: #fff;
`;

export const ConfiguracaoHeader = styled.TouchableOpacity`
  margin-right: 5px;
  border-radius: 5px;
  align-items: center;
  width: 40px;
  justify-content: center;
`;

export const ModalContainer = styled.View`
    margin: 5px;
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    align-items: flex-start;
    box-shadow: 5px 5px #000;
    elevation: 5;
`;

export const ExitButton = styled.TouchableHighlight`
    border-radius: 20px;
    align-self: center;
    padding: 5px;
    elevation: 2;
    background: #000;
`;

export const TextExitButton = styled.Text`
    color: white;
    font-weight: bold;
    text-align: center;
`;

export const Description = styled.Text`
    font-size: 20px;
    color: #000;
`;

export const GraficoConteiner = styled.View`
    margin-top: 10px;
    margin-left: 10px;
`;

export const ConfiguracaoConteiner = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
