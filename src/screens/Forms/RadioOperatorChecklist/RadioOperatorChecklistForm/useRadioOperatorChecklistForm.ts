import { useCallback, useState } from "react";
import { Vehicle } from "@api/vehicle/types";
import { useFocusEffect } from "@react-navigation/native";
import { listAvailableVehicles } from "@api/vehicle/vehicleApi";
import { postDutyCare } from "@api/dutyCareChecklist/dutyCareChecklistApi";
import { getChecklistQuestions } from "@api/checklist/checklistApi";
import {
  Checklist,
  ChecklistQuestion,
  ChecklistQuestionType,
  ChecklistType,
} from "@api/checklist/types";
import { isString } from "@utils/stringHelper";
import { listDutyForChecklist } from "@api/duty/dutyApi";
import { Duty } from "@api/duty/types";
import { PostRadioOperatorChecklistPayload } from "@api/radioOperatorChecklist/types";
import { postRadioOperatorChecklist } from "@api/radioOperatorChecklist/radioOperatorChecklistApi";

export type PostRadioOperatorChecklistPayloadField = keyof PostRadioOperatorChecklistPayload;

export const useRadioOperatorChecklistForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [dutyList, setDutyList] = useState<Duty[]>([]);
  const [checklistQuestions, setChecklistQuestions] = useState<
    Checklist | undefined
  >();
  const [form, setForm] = useState<PostRadioOperatorChecklistPayload>({});

  const setFormValue = useCallback(
    (key: PostRadioOperatorChecklistPayloadField, value: string) => {
      setForm({ ...form, [key]: value });
    },
    [form],
  );

  const setFormChecklistQuestionValue = useCallback(
    ({
      question,
      item,
      optionValue,
    }: {
      question: ChecklistQuestion;
      item?: string;
      optionValue: string | string[] | null;
    }) => {
      let checklistAnswers = Array.isArray(form.checklistAnswers)
        ? [...form.checklistAnswers]
        : [];

      const questionIndex = checklistAnswers.findIndex(
        (answer) =>
          answer.checklistQuestionId === question.id &&
          answer.checklistQuestionItem === item,
      );

      const isValidOption =
        isString(optionValue) ||
        (Array.isArray(optionValue) && optionValue.length > 0);

      // Check if click on the same option
      if (
        isValidOption &&
        question.type === ChecklistQuestionType.OPTION &&
        questionIndex > -1 &&
        !question.multiple &&
        checklistAnswers[questionIndex].checklistQuestionOption ===
          optionValue &&
        checklistAnswers[questionIndex].checklistQuestionItem === item
      ) {
        checklistAnswers = checklistAnswers.filter(
          (_, index) => index !== questionIndex,
        );
        setForm({ ...form, checklistAnswers });
        return;
      }

      if (questionIndex > -1) {
        if (isValidOption) {
          checklistAnswers[questionIndex] = {
            ...checklistAnswers[questionIndex],
            checklistQuestionItem: item,
            checklistQuestionOption: Array.isArray(optionValue)
              ? optionValue.join(";")
              : String(optionValue),
          };
        } else {
          checklistAnswers = checklistAnswers.filter(
            (_, index) => index !== questionIndex,
          );
        }
      } else if (isValidOption) {
        checklistAnswers = [
          ...checklistAnswers,
          {
            checklistQuestionId: question.id,
            checklistQuestion: question.text,
            checklistQuestionItem: item,
            checklistQuestionOption: Array.isArray(optionValue)
              ? optionValue.join(";")
              : String(optionValue),
          },
        ];
      }

      setForm({ ...form, checklistAnswers });
    },
    [form],
  );

  const isFormValid = true;

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);

        const responseChecklistQuestions = await getChecklistQuestions(
          ChecklistType.RADIO_OPERATOR,
        );
        if (
          responseChecklistQuestions.success &&
          responseChecklistQuestions.result
        ) {
          setChecklistQuestions({ ...responseChecklistQuestions.result });
        }

        const responseDutyList = await listDutyForChecklist();
        if (responseDutyList.success && responseDutyList.result) {
          setDutyList([...responseDutyList.result]);
        }

        setIsLoading(false);
      };

      fetchData();
    }, []),
  );

  const save = async () => {
    setIsProcessing(true);

    const payload = { ...form };

    const response = await postRadioOperatorChecklist(payload);

    setIsProcessing(false);

    return response;
  };

  return {
    isLoading,
    isProcessing,
    dutyList,
    checklistQuestions,
    form,
    setFormValue,
    setFormChecklistQuestionValue,
    isFormValid,
    save,
  };
};
