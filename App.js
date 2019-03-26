import { createAppContainer, createStackNavigator } from 'react-navigation'
import { DetailScreen } from './components/DetailScreen'
import { MainScreen } from './components/MainScreen'

const AppNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Detail: DetailScreen,
  },
  {
    initialRouteName: 'Main',
  }
)

export default createAppContainer(AppNavigator)
