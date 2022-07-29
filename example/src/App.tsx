import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Main';
import Details from './Details';
import { logger } from '@rongcloud/react-native-im-wrapper';

const Stack = createNativeStackNavigator();

class App extends React.Component {

  constructor(props: any) {
    super(props)
    logger.enable = true
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'>
          <Stack.Screen name='Main' component={Main} options={{ headerTitle: 'RN IM Wrapper测试专用DEMO' }} />
          <Stack.Screen name='Details' component={Details} options={{}} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}


export default App;
