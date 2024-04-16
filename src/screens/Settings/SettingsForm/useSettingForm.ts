import { useCallback, useEffect, useMemo, useState } from "react"
import { postVehicle, putVehicle } from "@api/vehicle/vehicleApi";
import { isString } from "@utils/stringHelper";
import { SettingKey } from "@api/settings/types";
import { useFocusEffect } from "@react-navigation/native";
import { getSetting, postSetting } from "@api/settings/settingApi";

interface UseSettingFormProps {
  settingKey: SettingKey;
}

const useSettingForm = ({ settingKey }: UseSettingFormProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [text, setText] = useState('');
  const [list, setList] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        const response = await getSetting(settingKey);
        if (response?.success) {
          setList([...response.result]);
        }
        setIsLoading(false);
      };

      fetchData()
    }, [settingKey])
  );

  const save = async () => {
    setIsProcessing(true);

    const response = await postSetting(settingKey, list);

    setIsProcessing(false);

    return response;
  }

  return {
    isLoading,
    isProcessing,
    text,
    setText,
    list,
    setList,
    save
  }
}

export default useSettingForm;
