import React, {Component} from 'react';
import { StyleSheet, ListView, Text, TextInput, View, Button, TouchableHighlight} from 'react-native';
import {StackNavigator} from 'react-navigation';

class MainScreen extends Component {
  static navigationOptions = {
    title: 'Welcome'
  }

  constructor (props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows([
        'John',
        'Joel',
        'James',
        'Jimmy',
        'Jackson',
        'Jillian',
        'Julie',
        'Devin'
      ])
    };
  }
  render () {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID, highlightRow) => {
            return (
              <TouchableHighlight onPress={() => {
                  navigate('Profile', {name: rowData});
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

class ProfileScreen extends Component {
  static navigationOptions = {
    title: ({state}) => `${state.params.name}'s Profile`,
    header: ({ state, setParams }) => ({
      // Render a button on the right side of the header
      // When pressed switches the screen to edit mode.
      right: (
        <Button
          title={state.params.editing ? 'Done' : 'Edit'}
          onPress={() => setParams({editing: !state.params.editing})}
        />
      )
    })
  }

  render () {
    const {state} = this.props.navigation;
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value={state.params.name}
          editable={!!state.params.editing} />
      </View>
    );
  }
}

const App = StackNavigator({
  Main: {
    screen: MainScreen
  },
  Profile: {
    screen: ProfileScreen
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
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  }
});

export default App
