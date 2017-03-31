import React, {Component} from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';

const OSM_API_EKY = process.env.OSM_API_KEY;

class MainScreen extends Component {
  static navigationOptions = {
    title: 'Today'
  }

  constructor (props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows([
        'Tokyo',
        'California',
        'Jakarta',
        'Melbourne',
        'Miami',
        'Barcelona',
        'Paris',
        'London'
      ])
    };
  }
  render () {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID, highlightRow) => {
            return (
              <TouchableHighlight onPress={() => {
                  navigate('Detail', {name: rowData});
                  highlightRow(sectionID, rowID);
                }}>
                <View>
                  <View style={styles.row}>
                    <Text style={styles.text}>
                      {rowData}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          }}
        />
      </View>
    );
  }
}

class DetailScreen extends Component {
  static navigationOptions = {
    title: ({state}) => state.params.name
  }

  constructor() {
    super();
    this.state = {
      weather: ''
    }
  }

  async _getForecast(location) {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${OSM_API_KEY}`)
      const json = await response.json()
      console.log(json);
      return json['weather'][0];
    } catch(err) {
      return false;
    }
  }

  async componentDidMount() {
    const location = this.props.navigation.state.params.name;
    try {
      const forecast = await this._getForecast(location);
      this.setState({weather: forecast});
    } catch (err) {
      console.error(err);
    }
  }

  render () {
    const {state} = this.props.navigation;
    const weatherThemeMap = {
      'Drizzle': ['ios-rainy', 'blue'],
      'Rain': ['ios-rainy', 'blue'],
      'Clouds': ['ios-cloudy', 'gray'],
      'Haze': ['ios-cloudy', 'gray'],
      'Clear': ['ios-sunny', 'orange'],
    }
    const weather = (this.state.weather) ?
      (<View style={{flex: 0, flexDirection: 'column', alignItems: 'center'}}>
        <Ionicons name={weatherThemeMap[this.state.weather['main']][0]} size={256} color='white' />
        <Text style={{
          fontSize: 60,
          fontWeight: '900',
          color: 'white',
        }}>{state.params.name}</Text>
        <Text style={{
          fontSize: 60,
          fontWeight: '100',
          color: 'white',
        }}>{this.state.weather['main']}</Text>
        <Text style={{
          fontSize: 10,
          fontWeight: 'normal',
          color: 'white',
          paddingTop: 10,
        }}>{this.state.weather['description'].toUpperCase()}</Text>
      </View>) :
      (<ActivityIndicator
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large" />
      );
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: this.state.weather ? weatherThemeMap[this.state.weather['main']][1] : 'white',
      }}>
        {weather}
      </View>
    );
  }
}

const App = StackNavigator({
  Main: {
    screen: MainScreen
  },
  Detail: {
    screen: DetailScreen
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
    fontSize: 20,
  }
});

export default App
