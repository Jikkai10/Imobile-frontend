import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
    background: #fff;
`;

export const ButtonRegion = styled.TouchableOpacity`
    border-width: 1px;
    padding: 3px 6px 3px 6px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border-color: #000;
`;

export const DescriptionButtonRegion = styled.Text`
    font-size: 16px;
    color: #000;
`;

export const ConteinerSelect = styled.View`
    padding: 10px 0px 0px 10px;
    align-items: center;
    flex-direction: row;
    margin-bottom: 5px;
`;