import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './screens/Profile';
import WorldGrid from './screens/WorldGrid';

export default function App() {

  const getSongPreview = async (trackId: number) => {
    try {
      const response = await fetch(`https://api.deezer.com/track/${trackId}`);
      const data = await response.json();

      if (data.preview) {
        console.log("Preview URL: ", data.preview);
        // Do something with the preview URL
      } else {
        console.log("No preview available");
      }

    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    // getSongPreview(3135556);
  }, []);

  const Stack = createNativeStackNavigator();


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='Home'
              component={WorldGrid}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Profile'
              component={Profile}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
}


