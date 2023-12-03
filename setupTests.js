/* eslint-disable */
jest.mock("expo-font");
jest.mock("expo-asset");
jest.mock("expo-status-bar");
jest.mock("expo-splash-screen");
jest.mock("react-native-safe-area-context");
jest.useFakeTimers();
jest.setTimeout(50000);

jest.mock("react-native-text-input-mask", () => ({
  default: jest.fn(),
}));

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useIsFocused: jest.fn(() => true),
    useFocusEffect: jest.fn(),
  };
});

console.disableYellowBox = true;
