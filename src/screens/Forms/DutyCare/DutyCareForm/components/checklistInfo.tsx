import { View } from "react-native";
import CardInfo from "@screens/components/cardInfo";
import RadioGroup from "@screens/components/radioGroup";
import Styled from "../styles";
import { PostDutyCareChecklistPayload } from "@api/dutyCareChecklist/types";
import { Checklist, ChecklistQuestion, ChecklistQuestionItem, ChecklistQuestionOption, ChecklistQuestionType } from "@api/checklist/types";
import Input from "@screens/components/input";
import { isString } from "@utils/stringHelper";

const ChecklistInfo = ({
  checklistQuestions,
  form,
  setFormChecklistQuestionValue,
}: {
  checklistQuestions?: Checklist,
  form: PostDutyCareChecklistPayload,
  setFormChecklistQuestionValue: (
    { question, item, optionValue }:
    { question: ChecklistQuestion, item?: ChecklistQuestionItem, optionValue: string | string[] }
  ) => void,
}) => {
  if (!checklistQuestions || !Array.isArray(checklistQuestions.questions) || checklistQuestions.questions.length === 0) return <></>;


  const renderQuestionInput = (question: ChecklistQuestion) => {
    if (question.type === ChecklistQuestionType.TEXT) {
      return (
        <Input
          label={question.text}
          placeholder="Digite aqui..."
          value={""}
          onChangeText={(text) => setFormChecklistQuestionValue({ question, optionValue: text })}
        />
      )
    }

    const answer = form.checklistAnswers?.find(answer => answer.checklistQuestionId === question.id);
    const selectedValue = question.multiple && isString(answer?.checklistQuestionOption) ? answer?.checklistQuestionOption.split(';') : answer?.checklistQuestionOption;
    
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

export default ChecklistInfo;