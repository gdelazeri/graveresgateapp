import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import storage, { STORAGE_KEYS } from "@utils/storage";
import { IUser, getUserData } from "@api/user/userApi";

interface ITokens {
  newAccessToken: string | null;
  newRefreshToken: string | null;
}

interface UserContextState {
  userData: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: ITokens) => Promise<void>;
  clearTokens: () => Promise<void>;
}

type UserContextProps = {
  children?: ReactNode;
};

const UserContext = createContext<UserContextState>({
  userData: null,
  accessToken: "",
  refreshToken: "",
  setTokens: async () => {},
  clearTokens: async () => {},
});

export const UserProvider = (props: UserContextProps) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    const accessTokenStorage = await storage.get(STORAGE_KEYS.ACCESS_TOKEN);
    const refreshTokenStorage = await storage.get(STORAGE_KEYS.REFRESH_TOKEN);

    if (refreshTokenStorage) setRefreshToken(refreshTokenStorage);
    if (accessTokenStorage) {
      setAccessToken(accessTokenStorage);

      const userDataResponse = await getUserData();

      if (userDataResponse?.success) {
        setUserData(userDataResponse.result);
      } else {
        clearTokens()
      }
    }
  };

  const setTokens = async ({ newAccessToken, newRefreshToken }: ITokens) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);

    await storage.set(STORAGE_KEYS.ACCESS_TOKEN, String(newAccessToken));
    await storage.set(STORAGE_KEYS.REFRESH_TOKEN, String(newRefreshToken));

    const userDataResponse = await getUserData();
    if (userDataResponse?.success) {
      setUserData(userDataResponse.result);
    }
  };

  const clearTokens = async () => {
    setAccessToken(null);
    setRefreshToken(null);

    await storage.clear(STORAGE_KEYS.ACCESS_TOKEN);
    await storage.clear(STORAGE_KEYS.REFRESH_TOKEN);
  };

  return (
    <UserContext.Provider
      value={{ accessToken, refreshToken, setTokens, clearTokens, userData }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContext;
