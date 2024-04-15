import moment from "moment";
import { useCallback, useState } from "react";
import { Vehicle } from "@api/vehicle/types";
import { useFocusEffect } from "@react-navigation/native";
import { listAvailableVehicles } from "@api/vehicle/vehicleApi";
import { postDutyCare } from "@api/dutyCareChecklist/dutyCareChecklistApi";
import { PostDutyCareChecklistPayload } from "@api/dutyCareChecklist/types";
import { getChecklistQuestions } from "@api/checklist/checklistApi";
import { Checklist, ChecklistQuestion, ChecklistQuestionItem, ChecklistType } from "@api/checklist/types";
import { isString } from "@utils/stringHelper";
import { listDutyForChecklist } from "@api/duty/dutyApi";
import { Duty } from "@api/duty/types";
import { getSetting } from "@api/settings/settingApi";
import { SettingKey } from "@api/settings/types";

export type PostDutyCareChecklistField = keyof PostDutyCareChecklistPayload

export const useDutyCareForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([])
  const [dutyList, setDutyList] = useState<Duty[]>([])
  const [reasonList, setReasonList] = useState<string[]>([])
  const [cityList, setCityList] = useState<string[]>([])
  const [checklistQuestions, setChecklistQuestions] = useState<Checklist | undefined>()

  const [form, setForm] = useState<PostDutyCareChecklistPayload>({
    date: moment().format('YYYY-MM-DD'),
    time: moment().format('HH:mm'),
  })

  const setFormValue = useCallback((key: PostDutyCareChecklistField, value: string) => {
    setForm({ ...form, [key]: value })
  }, [form])

  const setFormChecklistQuestionValue = useCallback((
    { question, item, optionValue }:
    { question: ChecklistQuestion, item?: ChecklistQuestionItem, optionValue: string | string[] }
  ) => {
    let checklistAnswers = Array.isArray(form.checklistAnswers) ? [...form.checklistAnswers] : []

    const questionIndex = checklistAnswers.findIndex(answer => (
      answer.checklistQuestionId === question.id
    ))

    const isValidOption = isString(optionValue) || (Array.isArray(optionValue) && optionValue.length > 0)

    // Check if click on the same option
    if (
      isValidOption
      && questionIndex > -1
      && !question.multiple
      && checklistAnswers[questionIndex].checklistQuestionOption === optionValue
    ) {
      checklistAnswers = checklistAnswers.filter((_, index) => (index !== questionIndex))
      setForm({ ...form, checklistAnswers })
      return
    }
    
    if (questionIndex > -1) {
      if (isValidOption) {
        checklistAnswers[questionIndex] = {
          ...checklistAnswers[questionIndex],
          checklistQuestionOption: Array.isArray(optionValue) ? optionValue.join(';') : optionValue
        }
      } else {
        checklistAnswers = checklistAnswers.filter((_, index) => (index !== questionIndex))
      }
    } else if (isValidOption) {
      checklistAnswers = [
        ...checklistAnswers,
        {
          checklistQuestionId: question.id,
          checklistQuestion: question.text,
          checklistQuestionOption: Array.isArray(optionValue) ? optionValue.join(';') : optionValue,
        }
      ]
    }

    setForm({ ...form, checklistAnswers })
  }, [form])

  const isFormValid = true
  
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);

        const responseVehicles = await listAvailableVehicles();
        if (responseVehicles.success && responseVehicles.result) {
          setVehicleList([ ...responseVehicles.result ]);
        }

        const responseChecklistQuestions = await getChecklistQuestions(ChecklistType.DUTY_CARE);
        if (responseChecklistQuestions.success && responseChecklistQuestions.result) {
          setChecklistQuestions({ ...responseChecklistQuestions.result });
        }

        const responseDutyList = await listDutyForChecklist();
        if (responseDutyList.success && responseDutyList.result) {
          setDutyList([ ...responseDutyList.result ]);
        }

        const responseSettingDutyCareReasons = await getSetting(SettingKey.DUTY_CARE_REASONS);
        if (
          responseSettingDutyCareReasons.success
          && responseSettingDutyCareReasons.result
          && Array.isArray(responseSettingDutyCareReasons.result)
        ) {
          setReasonList([ ...responseSettingDutyCareReasons.result ]);
        }

        const responseSettingCities = await getSetting(SettingKey.CITIES);
        if (
          responseSettingCities.success
          && responseSettingCities.result
          && Array.isArray(responseSettingCities.result)
        ) {
          setCityList([ ...responseSettingCities.result ]);
        }

        setIsLoading(false);
      };

      fetchData()
    }, [])
  );

  const save = async () => {
    setIsProcessing(true);

    const payload = {
      ...form
    };

    const response = await postDutyCare(payload);

    setIsProcessing(false);

    return response
  };
  
  return {
    isLoading,
    isProcessing,
    vehicleList,
    dutyList,
    reasonList,
    cityList,
    checklistQuestions,
    form,
    setFormValue,
    setFormChecklistQuestionValue,
    isFormValid,
    save
  };
}