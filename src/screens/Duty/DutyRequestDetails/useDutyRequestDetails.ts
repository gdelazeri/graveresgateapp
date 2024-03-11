import { useCallback, useState } from "react";
import { deleteDutyRequest, getDutyRequestDetails, getDutyRequests } from "@api/dutyRequest/dutyRequestApi";
import { DutyRequestListItem } from "@api/dutyRequest/types";
import { useFocusEffect } from "@react-navigation/native";

const useDutyRequestDetails = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dutyRequest, setDutyRequest] = useState<DutyRequestListItem>();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        const response = await getDutyRequestDetails(id);
        if (response?.success) {
          setDutyRequest(response.result);
        }
        setIsLoading(false);
      };

      fetchData()
    }, [id])
  );

  const remove = async () => {
    setIsProcessing(true);

    const response = await deleteDutyRequest(id);

    setIsProcessing(false);

    return response !== null
  };

  return {
    isLoading,
    isProcessing,
    dutyRequest,
    remove,
  };
};

export default useDutyRequestDetails;
