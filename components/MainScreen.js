import React from 'react'
import {
  ListView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'

export class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Today',
  }
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource: ds.cloneWithRows([
        'Tokyo',
        'California',
        'Jakarta',
        'Melbourne',
        'Miami',
        'Barcelona',
        'Paris',
        'London',
      ]),
    }
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID, highlightRow) => {
            return (
              <TouchableHighlight
                onPress={() => {
                  navigate('Detail', { name: rowData })
                  highlightRow(sectionID, rowID)
                }}>
                <View>
                  <View style={styles.row}>
                    <Text style={styles.text}>{rowData}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )
          }}
        />
      </View>
    )
  }
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
})
