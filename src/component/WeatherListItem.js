import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {hS, mS, vS} from '../theme/Matrics';
export default function WeatherListItm(r) {
  return (
    <View style={styles.wImageS} key={r.item.id}>
      <Image style={styles.wlListImageMain} source={r.item.image} />
      <Text style={styles.wListText}>{r.item.description}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  wImageS: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginEnd: hS(30),
  },
  wlListImageMain: {
    width: hS(35),
    height: vS(35),
    borderRadius: mS(10),
    paddingBottom: vS(20),
  },
  wListText: {
    paddingTop: vS(7),
    fontSize: mS(13),
    color: '#303345',
  },
});
