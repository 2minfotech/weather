import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import WeatherImage from './WeatherImage';
import Format from '../constants/Format';
import {hS, mS, vS} from '../theme/Matrics';
export default function TodayItemList({v, data}) {
  return (
    <View style={styles.dlistMain} key={v.index}>
      <View style={styles.mainListD}>
        <Text style={styles.dList}>
          {moment(v.item).format(Format.HourTime)}
        </Text>
        <View style={styles.dayLists}>
          <WeatherImage date={moment().format()} data={data} />
        </View>
        <View>
          <Text style={styles.temp}>{data.hourly.temperature_2m[v.index]}</Text>
        </View>
        <Text style={styles.degree2}>{'\u02DA'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dlistMain: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  mainListD: {
    width: hS(42),
    height: vS(90),
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: mS(20),
    paddingTop: vS(10),
    display: 'flex',
    alignItems: 'center',
    marginRight: hS(10),
  },
  dList: {
    fontSize: mS(10),
  },
  dayLists: {
    width: '60%',
    height: '30%',
    display: 'flex',
    overflow: 'visible',
    marginVertical: vS(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  temp: {
    fontSize: mS(10),
    position: 'relative',
  },
  degree2: {
    fontSize: mS(20),
    top: -19,
    left: 10,
  },
});
