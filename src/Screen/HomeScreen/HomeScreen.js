/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-sparse-arrays */
/* eslint-disable no-shadow */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DayList} from '../../component/DayList';
import SelectDropdown from 'react-native-select-dropdown';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import WeatherImage from '../../component/WeatherImage';
import NotificationString from '../../constants/NotificationString';
import moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown';
import weather1 from '../../assects/image/WeatherList/icon.png';
import weather2 from '../../assects/image/WeatherList/weather2.png';
import weather3 from '../../assects/image/WeatherList/weather3.png';
import OnWeatherItemList from '../../component/OnWeatherItemLIst';
import TodayItemList from '../../component/TodayItemList';
import Format from '../../constants/Format';
import {hS, mS, vS} from '../../theme/Matrics';
const HomeScreen = ({navigation}) => {
  const [data, setData] = useState({});
  const [todayWeather, setTodayWeather] = useState([]);
  const [weatherLIst, setWeatherLIst] = useState([]);
  const [citys, setCitys] = useState(DayList[0].value);
  const [BgColor, setBgColor] = useState(
    'linear-gradient(125deg, rgba(254,156,76,1) 45%, rgba(236,130,76,45) 55%);',
  );
  const [bgImage, setBgImage] = useState();

  function getData(latitude, longitude, timeZone) {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=' +
        latitude +
        '&longitude=' +
        longitude +
        '&hourly=temperature_2m,rain,showers,windspeed_180m,temperature_180m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,precipitation_hours,windspeed_10m_max&current_weather=true&timezone=' +
        timeZone +
        '&past_days=1',
    )
      .then(res => res.json())
      .then(res => {
        setData(res);
      });
  }

  React.useEffect(() => {
    setTimeout(() => {
      const city = DayList[0];
      getData(city.latitude, city.longitude, city.timeZone);
    });
  }, []);

  function CityData(selectedItem, index) {
    const city = DayList[index];
    setCitys(city.value);
    getData(city.latitude, city.longitude, city.timeZone);
  }

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
      // setBgImage(require('../../assects/image/Dlist/darkImage.jpeg'));
      setBgColor('A6A6A6');
    } else {
      setBgColor(
        'linear-gradient(125deg, rgba(254,156,76,1) 45%, rgba(236,130,76,45) 55%);',
      );
    }
  }
  React.useEffect(() => {
    if (Object.keys(data).length > 0) {
      const today = moment();
      const number = data.hourly.time.filter(item => {
        return (
          // eslint-disable-next-line eqeqeq
          today.format('L') == moment(item).format('L') &&
          today.format('HH:mm') < moment(item).format('HH:mm A')
        );
      });
      setTodayWeather(number);
      sunset();
      // eslint-disable-next-line no-sparse-arrays
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
    <View style={[styles.container, {backgroundColor: BgColor}]}>
      <ImageBackground source={bgImage} style={styles.bgImage}>
        <View style={styles.headerImage}>
          <View style={styles.iconMain}>
            <View>
              <TouchableOpacity>
                <SelectDropdown
                  data={DayList.map(item => item.value)}
                  onSelect={CityData}
                  dropdownStyle={{borderRadius: 50}}
                  defaultValue={DayList[0].value}
                  buttonStyle={styles.headerButtonStyle}
                  buttonTextAfterSelection={(value, index) => {
                    return value;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
                <TextInput />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate(NotificationString.CITIES)}>
                <FontAwesome
                  style={styles.search}
                  value="bars"
                  size={30}
                  color="#900"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {/* <Text style={styles.bannerTitle}>{citys}</Text> */}
            <Text style={styles.bannern}>{moment().format('ddd, MMM DD')}</Text>
          </View>
          <View style={styles.weatherimgm}>
            <View style={styles.weatherIcon}>
              {data && <WeatherImage data={data} date={moment().format()} />}
            </View>
            <View style={styles.numberMain}>
              <View>
                <Text style={styles.number}>
                  {data &&
                    data.current_weather &&
                    data.current_weather.temperature}
                </Text>
              </View>
              <Text style={styles.degree}>{'\u02DA'}C</Text>
              <Text style={styles.numberTitle}>Rainy</Text>
            </View>
          </View>
          <View style={styles.wMain}>
            <FlatList
              data={weatherLIst}
              renderItem={v => OnWeatherItemList(v)}
            />
          </View>
          <View style={styles.iconMain}>
            <View style={styles.dayList}>
              <Text style={styles.todayList}>Today</Text>
              <TouchableOpacity>
                <Text style={styles.nextSeven}>Tomorrow</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dayList}>
              <TouchableOpacity
                onPress={() => navigation.navigate(NotificationString.DETAILS)}>
                <Text style={styles.nextSeven}>Next 7 Days</Text>
              </TouchableOpacity>
              <FontAwesome
                style={styles.bar}
                value="angle-right"
                size={20}
                color="#900"
              />
            </View>
          </View>
          <View style={styles.scrollList} />
          <ScrollView horizontal centerContent={true}>
            {data && (
              <FlatList
                data={todayWeather}
                contentContainerStyle={styles.dayList}
                renderItem={v => TodayItemList({v, data})}
              />
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? vS(0) : vS(10),
    height: vS(1200),
    width: hS(376),
    zIndex: 99999,
  },
  bgImage: {
    height: vS(1000),
  },
  headerImage: {
    paddingHorizontal: hS(20),
    paddingVertical: vS(20),
  },
  search: {
    color: '#000',
  },
  iconMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bannerTitle: {
    fontSize: mS(30),
    paddingTop: vS(20),
    paddingLeft: hS(13),
    width: hS(200),
    fontWeight: '600',
    lineHeight: vS(35),
    fontStyle: 'normal',
  },
  bannern: {
    color: '#9A938C',
    paddingLeft: hS(13),
  },
  weatherimgm: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vS(20),
  },
  number: {
    position: 'relative',
    fontSize: mS(47),
    fontWeight: '700',
    color: '#000000',
  },
  numberMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  degree: {
    position: 'absolute',
    top: 0,
    fontSize: mS(14),
    right: -15,
  },
  numberTitle: {
    fontSize: mS(20),
    fontWeight: '400',
    lineHeight: vS(30),
  },
  dayList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wMain: {
    marginBottom: vS(20),
    display: 'flex',
    flexDirection: 'row',
  },
  detailsb: {
    color: '#000',
    paddingRight: hS(30),
  },
  todayList: {
    paddingRight: hS(16),
    fontWeight: '500',
  },
  scrollList: {
    width: hS(600),
    height: vS(30),
    color: '#000',
  },
  nextSeven: {
    paddingEnd: hS(30),
  },
  tinyLogo2: {
    width: hS(10),
    height: vS(10),
    overflow: 'visible',
    paddingVertical: vS(20),
  },
  weatherIcon: {
    maxHeight: vS(224),
    width: hS(200),
    borderRadius: mS(400),
    overflow: 'hidden',
    resizeMode: 'center',
    marginEnd: hS(20),
    overflow: 'visible',
    marginTop: vS(10),
  },
  dropdown: {
    borderRadius: mS(20),
  },
  headerButtonStyle: {
    borderRadius: 50,
    height: vS(40),
    minWidth: hS(330),
  },
});
