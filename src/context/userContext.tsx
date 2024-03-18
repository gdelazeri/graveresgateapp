import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import storage, { STORAGE_KEYS } from "@utils/storage";
import { getUserData } from "@api/user/userApi";
import { User, UserPermission } from "@api/user/types";

interface ITokens {
  newAccessToken: string | null;
  newRefreshToken: string | null;
}

interface UserContextState {
  userData: User | null;
  permission: UserPermission | null,
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: ITokens) => Promise<void>;
  signOut: () => Promise<void>;
  clearTokens: () => Promise<void>;
}

type UserContextProps = {
  children?: ReactNode;
};

const UserContext = createContext<UserContextState>({
  userData: null,
  permission: null,
  accessToken: "",
  refreshToken: "",
  setTokens: async () => {},
  signOut: async () => {},
  clearTokens: async () => {},
});

export const UserProvider = (props: UserContextProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<UserPermission | null>(null);

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    try {
      const accessTokenStorage = await storage.get(STORAGE_KEYS.ACCESS_TOKEN);
      const refreshTokenStorage = await storage.get(STORAGE_KEYS.REFRESH_TOKEN);
  
      if (refreshTokenStorage) setRefreshToken(refreshTokenStorage);
      if (accessTokenStorage) {
        setAccessToken(accessTokenStorage);
  
        const userDataResponse = await getUserData();
        if (userDataResponse?.success) {
          setUserData(userDataResponse.result);
          setPermission(userDataResponse.result.permission);
        } else {
          clearTokens();
        }
      }
    } catch (err) {
      clearTokens();
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
      setPermission(userDataResponse.result.permission);
    }
  };

  const clearTokens = async () => {
    setAccessToken(null);
    setRefreshToken(null);

    await storage.clear(STORAGE_KEYS.ACCESS_TOKEN);
    await storage.clear(STORAGE_KEYS.REFRESH_TOKEN);
  }

  const signOut = async () => {
    await clearTokens();
    await storage.clear(STORAGE_KEYS.USERNAME);
    await storage.clear(STORAGE_KEYS.PASSWORD);
  }

  return (
    <UserContext.Provider
      value={{ accessToken, refreshToken, setTokens, signOut, clearTokens, userData, permission }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContext;
