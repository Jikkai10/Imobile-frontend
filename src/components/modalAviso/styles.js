import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ModalContainer = styled.View`
    background-color: #13131a;
    border-width: 2px;
    padding: 10px 20px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    opacity: 0.75;
    box-shadow: 10px 10px #00f;
    elevation: 5;
`;

export const Description = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
`;
