import React from 'react';
import {Image, Text, StyleSheet} from 'react-native';
import Format from '../constants/Format';
import moment from 'moment';
import {hS, mS, vS} from '../theme/Matrics';
const WeatherImage = props => {
  const temperaturesList =
    props.data && props.data.daily && props.data.daily.time;
  const weatherCodeList =
    props.data && props.data.daily && props.data.daily.weathercode;
  const now = moment(props.date).format(Format.YearMDate);
  const dayIndex = temperaturesList.findIndex(v => v === now);
  const weatherCode = weatherCodeList[dayIndex];
  switch (weatherCode) {
    case 0:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/0.png')}
        />
      );
    case 1:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/1.png')}
        />
      );
    case 2:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/partycloud.png')}
        />
      );
    case 3:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/3.png')}
        />
      );
    case 45:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/fog.webp')}
        />
      );
    case 48:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/rimice.webp')}
        />
      );
    case 51:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/51.png')}
        />
      );
    case 53:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/53.png')}
        />
      );
    case 55:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/55.png')}
        />
      );
    case 56:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/56.png')}
        />
      );
    case 57:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/57.png')}
        />
      );
    case 61:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/61.png')}
        />
      );
    case 63:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/63.png')}
        />
      );
    case 65:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/65.png')}
        />
      );
    case 66:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/66.png')}
        />
      );
    case 67:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/67.png')}
        />
      );
    case 71:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/71.png')}
        />
      );
    case 73:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/73.png')}
        />
      );
    case 75:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/75.png')}
        />
      );
    case 77:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/77.png')}
        />
      );
    case 80:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/Rainlihtt.png')}
        />
      );
    case 81:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/Rainlihtt.png')}
        />
      );
    case 82:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/82.png')}
        />
      );
    case 85:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/85.png')}
        />
      );
    case 86:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/86.png')}
        />
      );
    case 95:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/95.png')}
        />
      );
    case 96:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/96.png')}
        />
      );
    case 99:
      return (
        <Image
          style={styles.tinyLogo}
          source={require('../assects/image/Dlist/99.png')}
        />
      );
  }
};

export default WeatherImage;

const styles = StyleSheet.create({
  tinyLogo: {
    width: '100%',
    height: '100%',
    // height: vS(250),
    borderRadius: mS(400),
  },
});
