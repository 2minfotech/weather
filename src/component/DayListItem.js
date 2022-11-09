import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import WeatherImage from './WeatherImage';
import Format from '../constants/Format';
import {hS, mS, vS} from '../theme/Matrics';
export default function DayListItem({v, data}) {
  return (
    <View style={styles.daymain} key={v.id}>
      <View>
        <Text>{moment(v.item).format(Format.DAY)}</Text>
      </View>
      <View style={styles.degreem}>
        <Text style={styles.dayNumber}>
          {data && data.daily && data.daily.temperature_2m_max[v.index]} °
        </Text>
        <View style={styles.imageList}>
          {data && data.daily && data.daily.time && (
            <WeatherImage date={moment(v.item).format()} data={data} />
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  daymain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // eslint-disable-next-line no-dupe-keys
    height: vS(70),
    backgroundColor: 'rgba(255, 255, 255, 0.36)',
    borderRadius: mS(10),
    marginBottom: vS(10),
    paddingHorizontal: hS(10),
    paddingVertical: vS(10),
  },
  degreem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: hS(10),
  },
  dayNumber: {
    paddingRight: hS(8),
  },
  imageList: {
    width: hS(40),
    height: vS(40),
    resizeMode: 'cover',
    borderRadius: mS(200),
    justifyContent: 'flex-end',
  },
});
