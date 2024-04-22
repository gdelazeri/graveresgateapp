import { View } from "react-native";
import CardInfo from "@screens/components/cardInfo";
import RadioGroup from "@screens/components/radioGroup";
import Styled from "./styles";
import { Checklist, ChecklistQuestion, ChecklistQuestionType } from "@api/checklist/types";
import Input from "@screens/components/input";
import { isString } from "@utils/stringHelper";
import { PostDriverChecklistPayload } from "@api/driverChecklist/types";
import { INPUT_TYPE } from "@screens/components/input/types";
import Select from "@screens/components/select";
import RadioTableGroup from "@screens/components/radioTableGroup";

const ChecklistQuestions = ({
  checklistQuestions,
  form,
  setFormChecklistQuestionValue,
}: {
  checklistQuestions?: Checklist,
  form: PostDriverChecklistPayload,
  setFormChecklistQuestionValue: (
    { question, item, optionValue }:
    { question: ChecklistQuestion, item?: string, optionValue: string | string[] | null }
  ) => void,
}) => {
  if (!checklistQuestions || !Array.isArray(checklistQuestions.questions) || checklistQuestions.questions.length === 0) return <></>;

  const renderQuestionInput = (question: ChecklistQuestion) => {
    const answer = form.checklistAnswers?.find(answer => answer.checklistQuestionId === question.id);
    const selectedValue = question.multiple && isString(answer?.checklistQuestionOption) ? answer?.checklistQuestionOption.split(';') : answer?.checklistQuestionOption;
    const items = question.items || [];

    switch (question.type) {
      case ChecklistQuestionType.TEXT:
        return (
          <Input
            label={question.text}
            placeholder="Digite aqui..."
            value={answer?.checklistQuestionOption || ""}
            onChangeText={(text) => setFormChecklistQuestionValue({ question, optionValue: text })}
            type={INPUT_TYPE.TEXT}
          />
        )
      case ChecklistQuestionType.OPTION:
        if (items.length > 0) {
          const answerItems = form.checklistAnswers?.filter(answer => answer.checklistQuestionId === question.id);
          return (
            <RadioTableGroup
              label={`${question.text}${question.required ? '*' : ''}`}
              items={items.map(item => item.text)}
              options={question.options.map(option => option.text)}
              selectedValue={answerItems?.map((answerItem) => ({ item: answerItem.checklistQuestionItem as string, option: answerItem.checklistQuestionOption }))}
              onChangeValue={(item, option) => setFormChecklistQuestionValue({ question, item, optionValue: option })}
            />
          )
        }

        return (
          <RadioGroup
            label={`${question.text}${question.required ? '*' : ''}`}
            selectedValue={selectedValue}
            onChangeValue={(value) => setFormChecklistQuestionValue({ question, item: undefined, optionValue: value })}
            options={question.options.map(option => ({ label: option.text, value: option.text }))}
            multiple={question.multiple}
            hasOtherOption={question.hasOtherOption}
          />
        )
      case ChecklistQuestionType.SELECT:
        return (
          <Select
            label={`${question.text}${question.required ? '*' : ''}`}
            placeholder="Selecione"
            value={answer?.checklistQuestionOption}
            onChangeValue={(value) => setFormChecklistQuestionValue({ question, item: undefined, optionValue: value })}
            items={question.options.map(option => ({ label: option.text, value: option.text }))}
          />
        )
    }
  }

  return (
    <CardInfo title={checklistQuestions.name}>
      {checklistQuestions.questions.map((question, index) => (
        <View key={index.toString()}>
          {renderQuestionInput(question)}
          <Styled.Divider />
        </View>
      ))}
    </CardInfo>
  )
}

export default ChecklistQuestions;