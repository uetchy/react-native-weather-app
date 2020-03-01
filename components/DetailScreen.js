import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const OSM_API_KEY = Constants.manifest.extra.osmKey;

const weatherThemeMap = {
  Drizzle: ['ios-rainy', 'blue'],
  Rain: ['ios-rainy', 'blue'],
  Clouds: ['ios-cloudy', 'gray'],
  Haze: ['ios-cloudy', 'gray'],
  Clear: ['ios-sunny', 'orange'],
};

export default function DetailScreen({
  route: {
    params: { name },
  },
}) {
  const [weather, setWeather] = useState('');

  async function getForecast(location) {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${OSM_API_KEY}`,
      );
      const json = await response.json();
      return json['weather'][0];
    } catch (err) {
      return null;
    }
  }

  useEffect(() => {
    const fn = async () => {
      try {
        const forecast = await getForecast(name);
        setWeather(forecast);
      } catch (err) {
        console.error(err);
      }
    };
    fn();
  }, []);

  return (
    <Container weather={weather}>
      {weather ? (
        <WeatherComponent>
          <Ionicons name={weatherThemeMap[weather['main']][0]} size={256} color='white' />
          <Name>{name}</Name>
          <Condition>{weather['main']}</Condition>
          <Summary>{weather['description'].toUpperCase()}</Summary>
        </WeatherComponent>
      ) : (
        <ActivityIndicator style={{ height: 80 }} size='large' />
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({ weather }) => (weather ? weatherThemeMap[weather['main']][1] : 'black')};
`;

const WeatherComponent = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Name = styled.Text`
  font-size: 60px;
  font-weight: 900;
  color: white;
`;

const Condition = styled.Text`
  font-size: 60px;
  font-weight: 100;
  color: white;
`;

const Summary = styled.Text`
  font-size: 12px;
  font-weight: normal;
  color: white;
  padding-top: 20px;
`;
