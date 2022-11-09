import React from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';

export default function SearchCities() {
  return (
    <View style={styles.searchInput}>
      <Text>searchcities</Text>
      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => Alert.alert('search')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  searchInput: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
