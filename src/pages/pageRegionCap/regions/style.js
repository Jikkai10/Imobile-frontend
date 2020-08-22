import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
    background: #fff;
`;

export const ModalContainer = styled.View`
    margin: 20px;
    background: #fff;
    border-radius: 20px;
    padding: 35px;
    align-items: center;

    elevation: 5;
`;

export const ExitButton = styled.TouchableHighlight`
    background: #fff;
    border-radius: 20px;
    padding: 10px;
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