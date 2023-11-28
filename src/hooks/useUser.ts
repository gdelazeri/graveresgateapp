import storage, { STORAGE_KEYS } from "../utils/storage";
import { PostRegisterPayload, postRegister } from "../api/user";

const useUser = () => {
  const register = async (payload: PostRegisterPayload) => {
    const response = await postRegister(payload);

    if (response) {
      await storage.set(STORAGE_KEYS.ACCESS_TOKEN, response.result.accessToken);
      await storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.result.refreshToken);
      return true;
    }

    return false;
  };

  return {
    register,
  };
};

export default useUser;
