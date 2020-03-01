import React from 'react';
import { FlatList, Text, View, TouchableHighlight, StyleSheet } from 'react-native';

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { title: 'Tokyo', key: 'tokyo' },
          { title: 'California', key: 'california' },
          { title: 'Jakarta', key: 'jakarta' },
          { title: 'Melbourne', key: 'melbourne' },
          { title: 'Miami', key: 'miami' },
          { title: 'Barcelona', key: 'barcelona' },
          { title: 'Paris', key: 'paris' },
          { title: 'London', key: 'london' },
        ]}
        renderItem={({ item }) => (
          <TouchableHighlight
            key={item.title}
            onPress={() => {
              navigation.navigate('Detail', { name: item.title });
            }}>
            <View>
              <View style={styles.row}>
                <Text style={styles.text}>{item.title}</Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#F6F6F6',
  },
  text: {
    flex: 1,
    fontSize: 20,
  },
});
