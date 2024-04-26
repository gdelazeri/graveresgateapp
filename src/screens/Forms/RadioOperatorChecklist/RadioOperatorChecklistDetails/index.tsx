import moment from "moment";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import CardInfo from "@screens/components/cardInfo";
import Label from "@screens/components/label";
import Styled from "./styles";
import { useRadioOperatorChecklistDetails } from "./useRadioOperatorChecklistDetails";
import Loader from "@screens/components/loader";
import colors from "@theme/colors";
import { DutyShiftLabel } from "@api/dutyRequest/types";
import ChecklistAnswers from "@screens/components/checklistAnswers";

interface RadioOperatorChecklistDetailsProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      id: string;
    };
  };
}

const RadioOperatorChecklistDetails = ({ route }: RadioOperatorChecklistDetailsProps) => {
  const { id } = route.params || {};
  const { isLoading, radioOperatorChecklist } = useRadioOperatorChecklistDetails(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      <Styled.ScrollView>
        <CardInfo title="Informações gerais">
          <Label size={"small"} color={colors.Greyscale.b50}>
            Plantão
          </Label>
          <Label size={"medium"}>
            {moment(radioOperatorChecklist.duty.date).format("LL")} -{" "}
            {DutyShiftLabel[radioOperatorChecklist.duty.shift]}
          </Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>
            Preenchido em
          </Label>
          <Label size={"medium"}>
            {moment(radioOperatorChecklist.createdAt).format("DD/MM/YYYY HH:mm")}
          </Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>
            Preenchido por
          </Label>
          <Label size={"medium"}>{radioOperatorChecklist.createdByUser.name}</Label>
        </CardInfo>

        {Array.isArray(radioOperatorChecklist.checklistFilledAnswers) &&
          radioOperatorChecklist.checklistFilledAnswers.length > 0 && (
            <>
              <Styled.Divider />
              <ChecklistAnswers
                checklistName={'Checklist'}
                answers={radioOperatorChecklist.checklistFilledAnswers}
              />
            </>
          )}
      </Styled.ScrollView>
    </Styled.Container>
  );
};

export default RadioOperatorChecklistDetails;

export const NavHeader = ({ navigation }: RadioOperatorChecklistDetailsProps) => (
  <Header onBackPress={navigation.goBack} title="Checklist S.O." />
);
