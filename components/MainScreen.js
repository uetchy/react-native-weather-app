import React from 'react';
import { FlatList, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';

const cities = [
  { title: 'Tokyo', key: 'tokyo' },
  { title: 'California', key: 'california' },
  { title: 'Jakarta', key: 'jakarta' },
  { title: 'Melbourne', key: 'melbourne' },
  { title: 'Miami', key: 'miami' },
  { title: 'Barcelona', key: 'barcelona' },
  { title: 'Paris', key: 'paris' },
  { title: 'London', key: 'london' },
];

export default function MainScreen({ navigation: { navigate } }) {
  function handlePress(name) {
    navigate('Detail', { name });
  }

  return (
    <Container>
      <FlatList
        data={cities}
        renderItem={({ item: { title } }) => (
          <TouchableHighlight key={title} onPress={() => handlePress(title)}>
            <ListCell>
              <ListText>{title}</ListText>
            </ListCell>
          </TouchableHighlight>
        )}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const ListCell = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 15px;
  background-color: #f6f6f6;
`;

const ListText = styled.Text`
  flex: 1;
  font-size: 20px;
`;
