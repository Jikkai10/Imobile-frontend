import styled from 'styled-components/native';


export const Container = styled.View`
  flex: 1;
  background-color: #13131a;
`;

export const ContainerLogo = styled.View`
    height: 80px;
    width: 250px;
    align-items: center;
    padding: 10px 0px 10px 0px;
    justify-content: center;
    align-self: center;
    margin-top: 10%;
    background-color: #fafafa;
    border-color: #000;
    border-width: 1px;
    border-radius: 20px;
`;

export const Logo = styled.Image`
    height: 60px;
    width: 200px;
`;

export const Text = styled.Text`
    font-size: 16px;
    color: #fff;
    font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
    align-items: center;
    border-color: #fff;
    background-color: #13131a;
    border-width: 1px;
    padding: 2px 0px;
    margin-bottom: 10px;
    border-radius: 20px;
`;

export const ContainerRegion = styled.View`
    margin-top: 30%;
`;

export const ContainerList = styled.View`
    width: 180px;
    align-self: center;
    background-color: #000;
    padding: 10px 5px 0px 5px;
    border-radius: 20px;
    border-color: #fff;
    border-width: 1px;
`;

export const ButtonAvaliador = styled.TouchableOpacity`
    background-color: #13131a;
    width: 50%;
    border-top-right-radius: 10px;
    border-width: 2px;
    border-color: #191922;
    border-left-width: 0px;
    border-bottom-width: 0px;
    padding-left: 5px;
`;

export const ContainerButton = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-start;
`;
