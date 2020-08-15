import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    backgroundColor: #fff;
`;

export const ModalContainer = styled.View`
    margin: 20px;
    backgroundColor: #fff;
    borderRadius: 20px;
    padding: 35px;
    alignItems: center;
    shadowColor: #000;
    shadowOffset: {
        width: 5px;
        height: 5px;
    };
    shadowOpacity: 0.25;
    shadowRadius: 3.84px;
    elevation: 5;
`;

export const ExitButton = styled.TouchableHighlight`
    backgroundColor: #fff;
    borderRadius: 20px;
    padding: 10px;
    elevation: 2;
    backgroundColor: #000;
`;

export const TextExitButton = styled.Text`
    color: white;
    fontWeight: bold;
    textAlign: center;
`;

export const Description = styled.Text`
    font-size: 20px;
    color: #000;
    margin-left: 10px;
`;