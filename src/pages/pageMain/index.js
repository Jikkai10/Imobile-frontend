import React,{useEffect,useState,useRef} from 'react';
import {FlatList,StyleSheet,Dimensions} from 'react-native';
import logo from '../../logo/logo.png';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  interpolate,
  Extrapolate, 
  interpolateColors,
} from 'react-native-reanimated';
import {
  Container,
  ContainerList,
  Text,
  Button,
  Logo,
  ContainerLogo,
  ContainerRegion,
  ButtonAvaliador,
  ContainerButton
} from './styles';

function Main({navigation}) {
  const regions = [
    {
      region: 'Estado de São Paulo',
      key: 'SP',
    },
    {
      region: 'Capital',
      key: 'capital',
    },
    {
      region: 'Grande São Paulo',
      key: 'grandeSP',
    },
    {
      region: 'Litoral',
      key: 'litoral',
    },
    {
      region: 'Interior',
      key: 'interior',
    },
  ];
  function ListRegion(props) {
    return (
      <Button
        onPress={() => {
          navigation.navigate('valorizacao', {title: props.data.region});
        }}>
        <Text>{props.data.region}</Text>
      </Button>
    );
  }
  const heightList = useSharedValue(0);
  const containerLogoPosition = useSharedValue(-30);
  const logoOpacity = useSharedValue(0);
  const textPosition = useSharedValue(30);
  const avaliadorPositionX = useSharedValue(-Dimensions.get('window').width * 0.5);
  useEffect(()=>{
    containerLogoPosition.value = withTiming(0,{
      duration: 2000,
      easing: Easing.bounce,
    },()=>{
      logoOpacity.value = withTiming(1,{
        duration: 1500,
      });
      textPosition.value = withTiming(0, {
        duration: 1500,
        easing: Easing.bounce,
      });
      heightList.value = withTiming(200, {
        duration: 1500,
      });
      avaliadorPositionX.value = withTiming(0,{
        duration: 1500,
      });
    });
  },[]);
  const AvaliadorStyle = useAnimatedStyle(()=>{
    return {
      transform: [{
        translateX: avaliadorPositionX.value, 
      }]
    };
  })
  const TextStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: textPosition.value}],
      opacity: interpolate(
        textPosition.value,
        [30, 0],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });
  const ListStyle = useAnimatedStyle(()=>{
    return {
      height: heightList.value,
      
    };
  });
  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
    };
  });
  const ContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: containerLogoPosition.value}],
      opacity: interpolate(
        containerLogoPosition.value,
        [30, 0],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  

  return (
    <Container>
      <Animated.View style={[style.conteinerLogo,ContainerStyle]}>
        <Animated.Image source={logo} style={[style.logo,logoStyle]}/>
      </Animated.View>
      <Animated.Text  style={[style.text,{alignSelf: 'center'},TextStyle]}>Alguma frase interessante</Animated.Text>
      <ContainerRegion>
        <Animated.View style={[style.ContainerList,ListStyle]}>
          <FlatList
            data={regions}
            renderItem={({item}) => <ListRegion data={item} />}
            enableEmptySections={true}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      </ContainerRegion>
      <Animated.View style={[style.containerButton,AvaliadorStyle]}>
        <ButtonAvaliador>
          <Text>Encontre seu avaliador</Text>
        </ButtonAvaliador>
      </Animated.View>
    </Container>
  );
}

const style = StyleSheet.create({
  containerButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  conteinerLogo: {
    height: Dimensions.get('window').width * 0.2,
    width: Dimensions.get('window').width * 0.65,
    alignItems:"center",
    paddingVertical: 10,
    justifyContent:"center",
    alignSelf:"center",
    marginTop: Dimensions.get('window').width * 0.15,
    backgroundColor: '#fafafa',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
  },
  logo: {
    height: Dimensions.get('window').width * 0.15,
    width: Dimensions.get('window').width * 0.55,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  ContainerList: {
    width: Dimensions.get('window').width * 0.5,
    minWidth: 180,
    alignSelf: 'center',
    backgroundColor:'#000',
    paddingHorizontal: 5,
    paddingTop: 10,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
  }
});

export default Main;
