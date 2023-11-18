import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Navigation from './src/routes';
import colors from './src/theme/colors';
import fonts from './src/theme/fonts';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    [fonts.bold]: require('./src/theme/fonts/Roboto-Bold.ttf'),
    [fonts.medium]: require('./src/theme/fonts/Roboto-Medium.ttf'),
    [fonts.regular]: require('./src/theme/fonts/Roboto-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Greyscale.b100
  },
});
