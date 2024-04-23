import "moment/locale/pt-br";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import Navigation from "./src/routes";
import colors from "./src/theme/colors";
import fonts from "./src/theme/fonts";
import { UserProvider } from "@context/userContext";
import toastConfig from "@utils/toastConfig";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    [fonts.bold]: require("./src/theme/fonts/Roboto-Bold.ttf"),
    [fonts.regular]: require("./src/theme/fonts/Roboto-Regular.ttf"),
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
    <SafeAreaView
      style={styles.container}
      onLayout={onLayoutRootView}
      testID="safe-area-view"
    >
      <StatusBar style="auto" />
      <UserProvider>
        <Navigation />
      </UserProvider>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Greyscale.b100,
  },
});
