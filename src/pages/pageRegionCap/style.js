import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background: #13131a;
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
    background: #13131a;
    border-radius: 20px;
    padding: 20px;
    align-items: flex-start;
    box-shadow: 10px 10px #000;
    
`;

export const ExitButton = styled.TouchableHighlight`
    border-radius: 20px;
    align-self: center;
    padding: 5px;
    elevation: 2;
    background: #fff;
`;

export const TextExitButton = styled.Text`
    color: #000;
    font-weight: bold;
    text-align: center;
`;

export const Description = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #fff;
`;

export const GraficoConteiner = styled.View`
    margin-top: 10px;
    margin-left: 10px;
`;

export const ConfiguracaoConteiner = styled.View`
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const YearButton = styled.TouchableOpacity`
    border-width: 1px;
    width: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border-color: #fff;
`;

export const TextYear = styled.Text`
    font-weight: bold;
    font-size: 15px;
    color: #fff;
`;

export const ConteinerSelectYear = styled.View`
    flex-direction: row;
    margin-top: 5px;
    margin-bottom: 5px;
`;

export const Icon = styled.Image`
    height: 25px;
    width: 25px;
`;