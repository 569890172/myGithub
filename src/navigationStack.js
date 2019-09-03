import { createAppContainer,createStackNavigator } from 'react-navigation'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'

const NavigationStack = createAppContainer(createStackNavigator({
  screen1: {
    screen: FirstPage
  },
  screen2: {
    screen: SecondPage
  }
}))

export default NavigationStack
