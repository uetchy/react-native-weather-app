import React from 'react'
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const OSM_API_KEY = process.env.OSM_API_KEY

export class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'TitleA'),
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      weather: '',
    }
  }
  async _getForecast(location) {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${OSM_API_KEY}`
      )
      const json = await response.json()
      console.log(json)
      return json['weather'][0]
    } catch (err) {
      return false
    }
  }
  async componentDidMount() {
    const location = this.props.navigation.state.params.name
    try {
      const forecast = await this._getForecast(location)
      this.setState({ weather: forecast })
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    const { state } = this.props.navigation
    const weatherThemeMap = {
      Drizzle: ['ios-rainy', 'blue'],
      Rain: ['ios-rainy', 'blue'],
      Clouds: ['ios-cloudy', 'gray'],
      Haze: ['ios-cloudy', 'gray'],
      Clear: ['ios-sunny', 'orange'],
    }
    const weather = this.state.weather ? (
      <View style={styles.container}>
        <Ionicons
          name={weatherThemeMap[this.state.weather['main']][0]}
          size={256}
          color="white"
        />
        <Text style={styles.name}>{state.params.name}</Text>
        <Text style={styles.main}>{this.state.weather['main']}</Text>
        <Text style={styles.detail}>
          {this.state.weather['description'].toUpperCase()}
        </Text>
      </View>
    ) : (
      <ActivityIndicator
        animating={this.state.animating}
        style={{ ...styles.centering, height: 80 }}
        size="large"
      />
    )
    return (
      <View
        style={{
          ...styles.wrapper,
          backgroundColor: this.state.weather
            ? weatherThemeMap[this.state.weather['main']][1]
            : 'black',
        }}>
        {weather}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: { flex: 0, flexDirection: 'column', alignItems: 'center' },
  name: {
    fontSize: 60,
    fontWeight: '900',
    color: 'white',
  },
  main: {
    fontSize: 60,
    fontWeight: '100',
    color: 'white',
  },
  detail: {
    fontSize: 10,
    fontWeight: 'normal',
    color: 'white',
    paddingTop: 10,
  },
})
