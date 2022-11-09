import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {hS, mS, vS} from '../theme/Matrics';
export default function OnWeatherItemList(v) {
  return (
    <View style={[styles.weatherLists, styles.listMain]} key={v.item.id}>
      <View style={styles.listMain}>
        <Image style={styles.listImage} source={v.item.image} />
        <Text style={styles.listTitle}>{v.item.title}</Text>
      </View>
      <Text style={styles.listDescription}>{v.item.description}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  weatherLists: {
    backgroundColor: 'rgba(255, 255, 255, 0.36)',
    borderRadius: mS(10),
    height: vS(60),
    justifyContent: 'space-between',
    marginBottom: vS(6),
    paddingVertical: vS(10),
    paddingHorizontal: hS(10),
    flex: 1,
  },
  listMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listTitle: {
    paddingLeft: hS(5),
  },
  listDescription: {
    fontSize: mS(14),
  },
});
