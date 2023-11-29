import { createContext, useState, useEffect, ReactNode, useContext } from 'react'
import storage, { STORAGE_KEYS } from '@utils/storage'

interface ITokens {
  newAccessToken: string | null;
  newRefreshToken: string | null;
}

interface UserContextState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: ITokens) => Promise<void>
  clearTokens: () => Promise<void>
}

type UserContextProps = {
  children?: ReactNode;
}

const UserContext = createContext<UserContextState>({
  accessToken: '',
  refreshToken: '',
  setTokens: async () => {},
  clearTokens: async () => {}
})

export const UserProvider = (props: UserContextProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  useEffect(() => {
    loadTokens()
  }, [])

  const loadTokens = async () => {
    const accessTokenStorage = await storage.get(STORAGE_KEYS.ACCESS_TOKEN);
    const refreshTokenStorage = await storage.get(STORAGE_KEYS.REFRESH_TOKEN);

    if (accessTokenStorage) setAccessToken(accessTokenStorage);
    if (refreshTokenStorage) setRefreshToken(refreshTokenStorage);
  }

  const setTokens = async ({ newAccessToken, newRefreshToken }: ITokens) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);

    await storage.set(STORAGE_KEYS.ACCESS_TOKEN, String(newAccessToken));
    await storage.set(STORAGE_KEYS.REFRESH_TOKEN, String(newRefreshToken));
  }

  const clearTokens = async () => {
    setAccessToken(null);
    setRefreshToken(null);

    await storage.clear(STORAGE_KEYS.ACCESS_TOKEN);
    await storage.clear(STORAGE_KEYS.REFRESH_TOKEN);
  }

  return (
    <UserContext.Provider value={{ accessToken, refreshToken, setTokens, clearTokens }}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);

export default UserContext;