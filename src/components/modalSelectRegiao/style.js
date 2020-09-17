import styled from 'styled-components/native';


export const Container = styled.View`
    margin: 5px;
    background: #13131a;
    border-radius: 20px;
    padding: 0px 3px 10px 3px;
    width: 50%;
    max-height: 200px;
    align-self: center;
    margin-top: 7px;
    box-shadow: 5px 5px #000;
    elevation: 5;
`;

export const ButtonRegion = styled.TouchableOpacity`
    height: 40px;
    background-color: #13131a;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-top-width: 1px;
    
    border-color: #222;
`;

export const TextButton = styled.Text`
    font-size: 16px;
    color: #fff;
`;

export const TextConteiner = styled.View`
    elevation: 1;
    background-color: #13131a;
    height: 30px;
    justify-content: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px; 
`;

export const Description = styled.Text`
    margin-left: 7px;
    font-size: 16px;
    color: #fff;
`;
