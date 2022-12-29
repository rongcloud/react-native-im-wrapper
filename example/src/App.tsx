import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from './Details';
import { logger } from '@rongcloud/react-native-im-wrapper';
import Home from './Home';
import {
  RRCLoading
} from 'react-native-overlayer';

const Stack = createNativeStackNavigator();
const options = { loadingImage: null, text: 'Loading...' };
RRCLoading.setLoadingOptions(options);
RRCLoading.hide();

class App extends React.Component {

  constructor(props: any) {
    super(props)
    logger.enable = true
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} options={{ headerTitle: 'RN IM Wrapper测试专用DEMO', navigationBarHidden: true , headerShown: false}} />
          <Stack.Screen name='Details' component={Details} options={{}} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}


export default App;
