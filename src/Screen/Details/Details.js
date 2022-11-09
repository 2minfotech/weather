/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable no-sparse-arrays */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import {useState} from 'react';
import SelectList from 'react-native-dropdown-select-list';
import weather1 from '../../assects/image/WeatherList/icon.png';
import weather2 from '../../assects/image/WeatherList/weather2.png';
import weather3 from '../../assects/image/WeatherList/weather3.png';
import WeatherImage from '../../component/WeatherImage';
import DayListItem from '../../component/DayListItem';
import WeatherListItm from '../../component/WeatherListItem';
import Format from '../../constants/Format';
import {hS, mS, vS} from '../../theme/Matrics';
const Details = () => {
  const [data, setData] = useState({});
  const [weatherLIst, setWeatherLIst] = useState([]);
  const [day, setDays] = useState([]);
  const [bgImage, setBgImage] = useState();
  const [BgColor, setBgColor] = useState(
    'linear-gradient(125deg, rgba(254,156,76,1) 45%, rgba(236,130,76,45) 55%);',
  );
  function getData() {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=26.89&longitude=75.74&hourly=temperature_2m,rain,showers,windspeed_180m,temperature_180m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,precipitation_hours,windspeed_10m_max&current_weather=true&timezone=Asia%2FKolkata&past_days=1',
    )
      .then(res => res.json())
      .then(res => {
        setData(res);
      });
  }
  React.useEffect(() => {
    setTimeout(() => {
      getData();
    });
  }, []);
  function sunset() {
    const todays = moment();
    const sunset = data.daily.sunset.filter(item => {
      return (
        todays.format(Format.CURRENTDATE) ===
        moment(item).format(Format.CURRENTDATE)
      );
    });
    const toSunset = moment(sunset[0]).format(Format.HourTime);
    const todayTimeZone = moment().format(Format.HourTime);
    if (toSunset < todayTimeZone) {
      setBgImage(require('../../assects/image/Dlist/darkImage.jpeg'));
    } else {
      setBgColor(
        'linear-gradient(125deg, rgba(254,156,76,1) 45%, rgba(236,130,76,45) 55%);',
      );
    }
  }
  React.useEffect(() => {
    if (Object.keys(data).length > 0) {
      const today = moment();
      const numbers = data.daily.time.filter(item => {
        return (
          today.startOf(Format.DATE).format(Format.CURRENTDATE) <
          moment(item).endOf(Format.DATE).format(Format.CURRENTDATE)
        );
      });
      setDays(numbers);
      sunset();
      setWeatherLIst([
        {
          id: 1,
          image: weather1,
          title: 'RainFall',
          description: data.daily.rain_sum[0] + data.hourly_units.rain,
        },
        {
          id: 2,
          image: weather2,
          title: 'Wind',
          description:
            data.current_weather.windspeed + data.hourly_units.windspeed_180m,
        },
        {
          id: 3,
          image: weather3,
          title: 'Humidity',
          description:
            data.current_weather.winddirection +
            data.hourly_units.temperature_180m,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  if (Object.keys(data).length <= 0) {
    return <Text>pleasewait</Text>;
  }
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: BgColor}]}>
      <ImageBackground source={bgImage}>
        <View style={styles.tHead}>
          <View style={[styles.titleHead, styles.detailBox]}>
            <View>
              <Text>Tomorrow</Text>
            </View>
            <View style={[styles.degreem, styles.detailBox]}>
              <Text style={styles.teperaturesNumber}>
                {data && data.daily && data.daily.temperature_2m_max[0]} °
              </Text>
              <View style={styles.imageWeather}>
                <WeatherImage
                  date={moment().add(1, 'days').format()}
                  data={data}
                />
              </View>
            </View>
          </View>
          <FlatList
            data={weatherLIst}
            contentContainerStyle={[styles.weatherImage, styles.detailBox]}
            renderItem={r => WeatherListItm(r)}
          />
        </View>
        <View style={styles.daylist}>
          {day && (
            <FlatList data={day} renderItem={v => DayListItem({v, data})} />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Details;
const styles = StyleSheet.create({
  container: {
    height: vS(1200),
    width: hS(376),
    marginTop: vS(0),
    paddingHorizontal: hS(20),
    paddingVertical: vS(20),
    backgroundColor:
      'linear-gradient(125deg, rgba(254,156,76,1) 45%, rgba(236,130,76,45) 55%);',
  },
  titleHead: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vS(10),
  },
  tHead: {
    height: 180,
    paddingHorizontal: hS(10),
    paddingVertical: vS(10),
    marginHorizontal: hS(20),
    marginVertical: vS(20),
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  detailsImage: {
    width: hS(60),
    height: vS(60),
    filter: 'drop-shadow(0px 3px 10px rgba(23, 126, 37, 0.3))',
  },
  weatherImage: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vS(30),
  },
  degreem: {
    alignItems: 'center',
    marginRight: hS(10),
  },
  dayImage: {
    width: hS(40),
    height: vS(40),
  },
  imageWeather: {
    width: vS(30),
    height: hS(30),
    marginLeft: hS(10),
  },
  daylist: {
    paddingHorizontal: hS(20),
    paddingVertical: vS(20),
  },
  detailBox: {
    display: 'flex',
    flexDirection: 'row',
  },
});
