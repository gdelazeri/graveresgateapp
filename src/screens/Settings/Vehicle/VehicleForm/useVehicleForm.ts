import { useEffect, useMemo, useState } from "react"
import { Vehicle } from "@api/vehicle/types"
import { postVehicle, putVehicle } from "@api/vehicle/vehicleApi";
import { isString } from "@utils/stringHelper";

interface UseVehicleFormProps {
  vehicle?: Vehicle
}

const useVehicleForm = ({ vehicle }: UseVehicleFormProps) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [licensePlate, setLicensePlate] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const isValidForm = useMemo(() => (
    isString(name) &&
    isString(model)
  ), [
    name,
    model
  ])

  const fetchData = async () => {
    setName(vehicle?.name || '');
    setBrand(vehicle?.brand || '');
    setModel(vehicle?.model || '');
    setLicensePlate(vehicle?.licensePlate || '');
    setYear(vehicle?.year || '');
    setIsAvailable(Boolean(vehicle?.isAvailable));
  };

  useEffect(() => {
    fetchData()
  }, [vehicle])

  const save = async () => {
    setIsProcessing(true);

    let response

    if (isString(vehicle?.id)) {
      response = await putVehicle(String(vehicle?.id), {
        name,
        brand,
        model,
        licensePlate,
        year,
        isAvailable
      });
    } else {
      response = await postVehicle({
        name,
        brand,
        model,
        licensePlate,
        year,
        isAvailable
      });
    }

    setIsProcessing(false);

    return response
  }

  return {
    name,
    setName,
    brand,
    setBrand,
    model,
    setModel,
    year,
    setYear,
    licensePlate,
    setLicensePlate,
    isAvailable,
    setIsAvailable,
    isProcessing,
    isValidForm,
    save
  }
}

export default useVehicleForm;
