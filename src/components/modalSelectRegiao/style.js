import styled from 'styled-components/native';


export const Container = styled.View`
    margin: 5px;
    background: #fff;
    border-radius: 20px;
    padding-bottom: 10px;
    width: 50%;
    max-height: 200px;
    align-self: center;
    margin-top: 7px;
    box-shadow: 5px 5px #000;
    elevation: 5;
`;

export const ButtonRegion = styled.TouchableOpacity`
    height: 40px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-top-width: 1px;
    
    border-color: #fafafa;
`;

export const TextButton = styled.Text`
    font-size: 16px;
    color: #000;
`;

export const TextConteiner = styled.View`
    elevation: 1;
    background-color: #fff;
    height: 30px;
    justify-content: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px; 
`;

export const Description = styled.Text`
    margin-left: 7px;
    font-size: 16px;
`;
