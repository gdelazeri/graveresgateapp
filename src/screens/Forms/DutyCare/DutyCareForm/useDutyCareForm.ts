import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import { Vehicle } from "@api/vehicle/types";
import { useFocusEffect } from "@react-navigation/native";
import { listAvailableVehicles } from "@api/vehicle/vehicleApi";
import { isString } from "@utils/stringHelper";
import { postDutyCare } from "@api/dutyCareChecklist/dutyCareChecklistApi";
import { DutyCareChecklistIncidentContinuation, PostDutyCareChecklistPayload } from "@api/dutyCareChecklist/types";
import { getChecklistQuestions } from "@api/checklist/checklistApi";
import { Checklist, ChecklistQuestion, ChecklistQuestionItem, ChecklistQuestionOption, ChecklistType } from "@api/checklist/types";

export type PostDutyCareChecklistField = keyof PostDutyCareChecklistPayload

export const useDutyCareForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([])
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
    
    if (questionIndex > -1) {
      checklistAnswers[questionIndex] = {
        ...checklistAnswers[questionIndex],
        checklistQuestionOption: Array.isArray(optionValue) ? optionValue.join(';') : optionValue
      }
    } else {
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

        setIsLoading(false);
      };

      fetchData()
    }, [])
  );

  const save = async () => {
    setIsProcessing(true);

    const payload = { };

    const response = await postDutyCare(payload);

    setIsProcessing(false);

    return response
  };
  
  return {
    isLoading,
    isProcessing,
    vehicleList,
    checklistQuestions,
    form,
    setFormValue,
    setFormChecklistQuestionValue,
    isFormValid,
    save
  };
}