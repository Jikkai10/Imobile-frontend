import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text, Image} from 'react-native';
import {mapStyle} from './style';
import MapView, {Marker, Callout, MarkerAnimated} from 'react-native-maps';
//import ApiBairro from '../../controllers/apiBairro';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function mapa({
  bairro,
  api,
  navigation,
  anosSelecionados,
  setBairro,
  voltaBairro,
  setVoltaBairro,
}) {
  //console.log(anosSelecionados);
  const markers = [
    {
      coordenada: {
        latitude: -23.560175,
        longitude: -46.632881,
        latitudeDelta: 0.115,
        longitudeDelta: 0.1121,
      },
      title: 'São Paulo',
      description: 'esse é o marker',
    },
  ];
  var [region, setRegion] = useState(markers[0].coordenada);
  const [localizacaoAtual, setLocalizacaoAtual] = useState();
  /*useEffect(()=>{
    if(voltaBairro){
      let newRegion = markers.find((item) => item.title === bairro);
      setRegion(newRegion.coordenada);
    }
    setVoltaBairro(false);
  },[voltaBairro]);
  useEffect(() => {
    //setModalVisibleComp(false);
    if (bairro !== undefined) {
      let newRegion = markers.find((item) => item.title === bairro);
      setRegion(newRegion.coordenada);
    }
    
    
  }, [bairro]);*/

  return (
    <View style={{flex: 1}}>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        region={region}
        onRegionChangeComplete={(regionAtual) => {
          setRegion(regionAtual);
          //console.log(localizacaoAtual);
        }}
        //minZoomLevel={13.5}
        >
        {markers.map((marker) => {
          
          return (
            <Marker
              coordinate={marker.coordenada}
              key={marker.title}
              onCalloutPress={() => {
                
                navigation.navigate('valorizacao', {
                  title: marker.title,
                });
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 0.75,
                }}>
                <Icon name="home" size={70} color="#00f" />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: 20,
                    marginTop: -10,
                  }}>
                  {marker.title}
                </Text>
              </View>
              <Callout tooltip={true} style={{width: 250}}>
                <View style={styles.marker}>
                  <Text style={styles.textMarker}>{marker.title}</Text>
                  <Text style={styles.textMarker}>
                    É a capital
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: Dimensions.get('window').height,
  },
  marker: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
  },
  textMarker: {
    color: '#000',
  },
});
