import { View } from "react-native";
import { ChecklistFilledAnswer } from "@api/checklist/types";
import colors from "@theme/colors";
import CardInfo from "../cardInfo";
import Label from "../label";
import Styled from "./styles";
import { isString } from "@utils/stringHelper";

interface ChecklistAnswersProps {
  checklistName: string;
  answers: ChecklistFilledAnswer[];
}

const ChecklistAnswers = ({
  checklistName,
  answers,
}: ChecklistAnswersProps) => {
  const groupedByQuestion = answers.reduce(
    (
      result: { [key: string]: ChecklistFilledAnswer[] },
      currentValue: ChecklistFilledAnswer,
    ) => {
      (result[currentValue["checklistQuestion"]] =
        result[currentValue["checklistQuestion"]] || []).push(currentValue);
      return result;
    },
    {},
  );
  const length = Object.keys(groupedByQuestion).length;

  return (
    <CardInfo title={checklistName}>
      {Object.keys(groupedByQuestion).map((question, index) => (
        <View key={index.toString()}>
          <Label size={"small"} color={colors.Greyscale.b50}>
            {question}
          </Label>
          {groupedByQuestion[question].map((answer, aIndex) =>
            isString(answer.checklistQuestionItem) ? (
              <Label key={`${index.toString()}_${aIndex}`} size={"medium"}>
                {answer.checklistQuestionItem}: {answer.checklistQuestionOption}
              </Label>
            ) : (
              <Label key={`${index.toString()}_${aIndex}`} size={"medium"}>
                {answer.checklistQuestionOption.replace(/;/g, ", ")}
              </Label>
            ),
          )}
          {index < length - 1 && <Styled.Divider />}
        </View>
      ))}
    </CardInfo>
  );
};

export default ChecklistAnswers;
