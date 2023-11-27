import * as SecureStore from "expo-secure-store";

const get = (key: string) => SecureStore.getItemAsync(key);

const set = (key: string, value: string) =>
  SecureStore.setItemAsync(key, value);

const clear = (key: string) => SecureStore.deleteItemAsync(key);

export enum STORAGE_KEYS {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export default { get, set, clear };
