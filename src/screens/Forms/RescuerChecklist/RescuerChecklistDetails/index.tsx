import moment from "moment";
import { View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import CardInfo from "@screens/components/cardInfo";
import Label from "@screens/components/label";
import Styled from "./styles";
import { useRescuerChecklistDetails } from "./useRescuerChecklistDetails";
import Loader from "@screens/components/loader";
import colors from "@theme/colors";
import { DutyShiftLabel } from "@api/dutyRequest/types";
import ChecklistAnswers from "@screens/components/checklistAnswers";

interface RescuerChecklistDetailsProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      id: string;
    };
  };
}

const RescuerChecklistDetails = ({ route }: RescuerChecklistDetailsProps) => {
  const { id } = route.params || {};
  const { isLoading, rescuerChecklist } = useRescuerChecklistDetails(id);

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
            {moment(rescuerChecklist.duty.date).format("LL")} -{" "}
            {DutyShiftLabel[rescuerChecklist.duty.shift]}
          </Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>
            Viatura
          </Label>
          <Label size={"medium"}>{rescuerChecklist.vehicle.name}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>
            Preenchido em
          </Label>
          <Label size={"medium"}>
            {moment(rescuerChecklist.createdAt).format("DD/MM/YYYY HH:mm")}
          </Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>
            Preenchido por
          </Label>
          <Label size={"medium"}>{rescuerChecklist.createdByUser.name}</Label>
        </CardInfo>

        {Array.isArray(rescuerChecklist.checklistFilledAnswers) &&
          rescuerChecklist.checklistFilledAnswers.length > 0 && (
            <>
              <Styled.Divider />
              <ChecklistAnswers
                checklistName={'Checklist'}
                answers={rescuerChecklist.checklistFilledAnswers}
              />
            </>
          )}
      </Styled.ScrollView>
    </Styled.Container>
  );
};

export default RescuerChecklistDetails;

export const NavHeader = ({ navigation }: RescuerChecklistDetailsProps) => (
  <Header onBackPress={navigation.goBack} title="Checklist Socorrista" />
);
