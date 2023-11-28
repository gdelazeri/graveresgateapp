import storage, { STORAGE_KEYS } from "@utils/storage";

const useUser = () => {
  const getTokens = async () => {
    const accessToken = await storage.get(STORAGE_KEYS.ACCESS_TOKEN);
    const refreshToken = await storage.get(STORAGE_KEYS.REFRESH_TOKEN);

    return {
      accessToken,
      refreshToken,
    };
  };

  const setTokens = async ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => {
    await storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    await storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  };

  return {
    getTokens,
    setTokens,
  };
};

export default useUser;
