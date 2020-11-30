import React, {useEffect, useState, useRef, forwardRef} from 'react';
import api from '../../services/api';
import Loading from '../../components/loading';
import Error from '../../components/error';
import {
  FlatList,
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  Text,
  //ScrollView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
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
  Text as Text2,
  Button,
  Logo,
  ContainerLogo,
  ContainerRegion,
  ButtonAvaliador,
  ContainerButton,
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
      key: 'Grande SP',
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
          navigation.navigate('valorizacao', {
            title: props.data.region,
            key: props.data.key,
          });
        }}>
        <Text2>{props.data.region}</Text2>
      </Button>
    );
  }
  const heightList = useSharedValue(0);
  const positionList = useSharedValue(30);
  const containerLogoPosition = useSharedValue(-30);
  const logoOpacity = useSharedValue(0);
  const textPosition = useSharedValue(30);
  const avaliadorPositionX = useSharedValue(
    -Dimensions.get('window').width * 0.5,
  );
  useEffect(() => {
    positionList.value = withTiming(0, {
      duration: 2100,
      easing: Easing.bounce,
    });
    containerLogoPosition.value = withTiming(
      0,
      {
        duration: 2000,
        easing: Easing.bounce,
      },
      () => {
        logoOpacity.value = withTiming(1, {
          duration: 1500,
        });
        textPosition.value = withTiming(0, {
          duration: 1500,
          easing: Easing.bounce,
        });
        heightList.value = withTiming(200, {
          duration: 1500,
        });
        avaliadorPositionX.value = withTiming(0, {
          duration: 1500,
        });
      },
    );
  }, []);
  const heightAvaliadores = useSharedValue(
    Dimensions.get('window').height - 50,
  );

  const [visibleAval, setVisibleAval] = useState(false);

  useEffect(() => {
    if (!visibleAval) {
      heightAvaliadores.value = withTiming(
        Dimensions.get('window').height - 47,
        {
          duration: 750,
        },
        () => setFirst(true),
      );
    } else {
      heightAvaliadores.value = withTiming(
        Dimensions.get('window').height * 0.1,
        {
          duration: 750,
        },
        () => setFirst(false),
      );
    }
  }, [visibleAval]);

  const AvaliadorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: avaliadorPositionX.value,
        },
      ],
      top: heightAvaliadores.value,
    };
  });

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

  const ListStyle = useAnimatedStyle(() => {
    return {
      height: heightList.value,
      transform: [{translateY: positionList.value}],
      opacity: interpolate(
        positionList.value,
        [30, 0],
        [0, 1],
        Extrapolate.CLAMP,
      ),
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

  const ContainerAvaliadores = useAnimatedStyle(() => {
    return {
      //transform: [{translateY: PositionAvaliadores.value }]
    };
  });

  const [avaliadores, setAvaliadores] = useState();
  const [recebidoAval, setRecebidoAval] = useState(false);
  useEffect(() => {
    if (avaliadores === undefined) {
      getAval();
    } else {
      setRecebidoAval(true);
    }
  }, [avaliadores]);
  const [error, setError] = useState(false);
  async function getAval() {
    try {
      let aval = await api.get('/avaliadores');
      setAvaliadores(aval.data);
      setError(false);
    } catch {
      setError(true);
    }
  }
  useEffect(()=>{
    if(error){
      getAval();
    }
  },[error]);
  

  function RenderItem({item, first}) {
    const [more, setMore] = useState(false);

    const positionImage = useSharedValue(Dimensions.get('window').width * 0.25);
    const positionText = useSharedValue(0);
    const opacityText = useSharedValue(0);
    const heightAval = useSharedValue(125);
    const widthText = useSharedValue(Dimensions.get('window').width * 0.63);
    const positionRight = useSharedValue(0);
    const image = useSharedValue(90);

    useEffect(() => {
      if (!first && visibleAval) {
        if (more) {
          positionImage.value = withTiming(
            Dimensions.get('window').width - 40,
            {
              duration: 1000,
            },
          );
          positionText.value = withTiming(140, {
            duration: 1000,
          });
          heightAval.value = withTiming(500, {
            duration: 1000,
          });
          widthText.value = withTiming(Dimensions.get('window').width - 25, {
            duration: 1000,
          });
          positionRight.value = withTiming(
            Dimensions.get('window').width - 30,
            {
              duration: 1000,
            },
          );
          image.value = withTiming(130, {
            duration: 1000,
          });
          opacityText.value = withTiming(1, {
            duration: 1500,
          });
        } else {
          positionImage.value = withTiming(
            Dimensions.get('window').width * 0.25,
            {
              duration: 1000,
            },
          );
          positionText.value = withTiming(0, {
            duration: 1000,
          });
          heightAval.value = withTiming(125, {
            duration: 1000,
          });
          widthText.value = withTiming(Dimensions.get('window').width * 0.63, {
            duration: 1000,
          });
          positionRight.value = withTiming(0, {
            duration: 1000,
          });
          image.value = withTiming(90, {
            duration: 1000,
          });
          opacityText.value = withTiming(0, {
            duration: 1000,
          });
        }
      }
    }, [more]);

    const styleMoreDescription = useAnimatedStyle(() => {
      return {
        opacity: opacityText.value,
      };
    });

    const styleImage = useAnimatedStyle(() => {
      return {
        height: image.value - 2,
        width: image.value - 2,
        borderRadius: (image.value - 2) / 2,
      };
    });

    const styleBorderImage = useAnimatedStyle(() => {
      return {
        height: image.value,
        width: image.value,
        borderRadius: image.value / 2,
      };
    });

    const styleConteinerImage = useAnimatedStyle(() => {
      return {
        width: positionImage.value,
        height: image.value + 10,
      };
    });
    const styleConteinerText = useAnimatedStyle(() => {
      return {
        top: positionText.value,
        right: positionRight.value,
        width: widthText.value,
      };
    });

    const styleContainerAval = useAnimatedStyle(() => {
      return {
        height: heightAval.value,
      };
    });

    const RenderI = () => {
      return (
        <ScrollView
          ref={React.createRef()}
          nestedScrollEnabled
          style={{maxHeight: 250}}>
          <Text style={style.description}>
            Especialidade: {item.especialidade}
          </Text>
          <Text style={style.description}>Localização: {item.localizacao}</Text>
          <Text style={style.description}>Contato: {item.contato}</Text>
          {more ? (
            <Animated.View style={styleMoreDescription}>
              <Animated.Text style={[style.description]}>
                Whats: {item.whats}
              </Animated.Text>
              <Animated.Text style={[style.description]}>
                Email: {item.email}
              </Animated.Text>
              <Animated.Text style={[style.description]}>
                Descrição:
              </Animated.Text>
              <Animated.Text
                style={[
                  style.description,
                  {marginLeft: 20, textAlign: 'justify', fontWeight: 'normal'},
                ]}>
                {item.descricao}
              </Animated.Text>
            </Animated.View>
          ) : null}
        </ScrollView>
      );
    };

    return (
      <Animated.View style={[style.buttonAval, styleContainerAval]}>
        <Animated.View style={[style.containerImage, styleConteinerImage]}>
          <Animated.View style={[style.borderImage, styleBorderImage]}>
            <Animated.Image
              source={{uri: item.imagem.url}}
              style={[style.image, styleImage]}
            />
          </Animated.View>
        </Animated.View>
        <Animated.View style={[style.containerText, styleConteinerText]}>
          <ScrollView nestedScrollEnabled style={{maxHeight: more ? 1000 : 85}}>
            <Text style={style.title}>{item.nome}</Text>
            <FlatList ListFooterComponent={() => <RenderI />} />
          </ScrollView>
        </Animated.View>

        <TouchableOpacity
          style={style.ButtonLink}
          onPress={() => setMore(!more)}>
          {more ? (
            <Text style={style.link}>Ver menos</Text>
          ) : (
            <Text style={style.link}>Ver mais</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  }
  const [first, setFirst] = useState(true);
  return (
    <Container>
      <Animated.View style={[style.conteinerLogo, ContainerStyle]}>
        <Animated.Image source={logo} style={[style.logo, logoStyle]} />
      </Animated.View>
      <Animated.Text style={[style.text, {alignSelf: 'center'}, TextStyle]}>
        Alguma frase interessante
      </Animated.Text>
      <ContainerRegion>
        <Animated.View style={[style.ContainerList, ListStyle]}>
          <FlatList
            data={regions}
            renderItem={({item}) => <ListRegion data={item} />}
            enableEmptySections={true}
            keyExtractor={(item) => item.key.toString()}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      </ContainerRegion>
      <Animated.View style={[style.containerButton, AvaliadorStyle]}>
        <ButtonAvaliador onPress={() => setVisibleAval(!visibleAval)}>
          <Text2>Encontre seu avaliador</Text2>
        </ButtonAvaliador>
        <Animated.View
          style={[style.containerAvaliadores, ContainerAvaliadores]}>
          {error ? (
            <Error />
          ) : !recebidoAval ? (
            <Loading />
          ) : (
            <>
              <FlatList
                data={avaliadores}
                renderItem={({item, index}) => (
                  <RenderItem item={item} first={first} />
                )}
                contentContainerStyle={{padding: 10}}
                //showsVerticalScrollIndicator={false}
                //scrollEnabled={false}

                keyExtractor={(item) => item._id}
              />
              <View style={style.border} />
            </>
          )}
        </Animated.View>
      </Animated.View>
    </Container>
  );
}

const style = StyleSheet.create({
  border: {
    position: 'absolute',
    left: Dimensions.get('window').width * 0.5 - 2,
    top: 0,
    height: 1,
    width: Dimensions.get('window').width * 0.5 + 2,
    borderTopWidth: 2,
    borderTopColor: '#191922',
  },

  containerText: {
    position: 'relative',
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#fafafa',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#fafafa',
    marginLeft: 10,
    //flexWrap: 'wrap',
  },
  link: {
    color: '#9999ff',
    fontSize: 13,
  },
  ButtonLink: {
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    left: 5,
    bottom: 5,
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  borderImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#444499',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 88,
    width: 88,
    borderRadius: 44,
  },
  buttonAval: {
    marginBottom: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#454566',
    padding: 10,
    paddingTop: 15,
    //alignItems: 'center',
    borderRadius: 10,
  },
  containerAvaliadores: {
    height: Dimensions.get('window').height * 0.9 - 30,
    //flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#13131a',
  },
  containerButton: {
    zIndex: 5,
    //alignSelf: 'flex-end',
    position: 'absolute',
    top: Dimensions.get('window').height - 50,
  },
  conteinerLogo: {
    height: Dimensions.get('window').width * 0.2,
    width: Dimensions.get('window').width * 0.65,
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center',
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
    backgroundColor: '#000',
    paddingHorizontal: 5,
    paddingTop: 10,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
  },
});

export default Main;
