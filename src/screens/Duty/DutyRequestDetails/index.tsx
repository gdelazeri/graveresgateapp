import { Alert } from "react-native";
import moment from "moment";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "@screens/components/header";
import Label from "@screens/components/label";
import Button from "@screens/components/button";
import { DutyPosition, DutyRequestListItem, DutyRequestStatus, DutyRequestStatusLabel, DutyShift, DutyShiftLabel } from "@api/dutyRequest/types";
import Styled from "./styles";
import DutyRequestPositions from "@screens/components/dutyRequestPositions";
import { isString } from "@utils/stringHelper";
import CardInfo from "@screens/components/cardInfo";
import Chip from "@screens/components/chip";
import colors from "@theme/colors";
import useDutyRequestDetails from "./useDutyRequestDetails";
import Loader from "@screens/components/loader";

interface DutyRequestDetailsProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      id: string;
    }
  }
}

const DutyRequestDetails = ({ route, navigation }: DutyRequestDetailsProps) => {
  const { id } = route.params;
  const { isLoading, isProcessing, dutyRequest, remove } = useDutyRequestDetails({ id })

  const onPressDelete = () => {
    Alert.alert(
      'Cancelar solicitação',
      'Deseja realmente cancelar a solicitação de plantão? Essa ação não poderá ser desfeita.',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: onDelete
        }
      ]
    )
  }
  const onDelete = async () => {
    await remove();
    navigation.goBack();
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Styled.Container>
        <CardInfo>
          <Label size={"small"}>Data</Label>
          <Label size={"medium"}>{moment(dutyRequest?.date).format('DD/MM/YYYY')}</Label>
          
          <Styled.Divider />

          <Label size={"small"}>Turno</Label>
          <Label size={"medium"}>{DutyShiftLabel[dutyRequest?.shift as DutyShift]}</Label>
          
          <Styled.Divider />

          <Label size={"small"}>Horário</Label>
          <Label size={"medium"}>Das {dutyRequest?.startAt.substring(0, 5)} às {dutyRequest?.endAt.substring(0, 5)}</Label>

          <Styled.Divider />

          <Label size={"small"}>Posições</Label>
          <DutyRequestPositions id={dutyRequest?.id as string} positions={(dutyRequest?.positions || []) as DutyPosition[]} />

          <Styled.Divider />

          <Label size={"small"}>Status</Label>
          <Chip
            label={DutyRequestStatusLabel[dutyRequest?.status as DutyRequestStatus]}
            labelColor={dutyRequest?.status === DutyRequestStatus.APPROVED ? colors.Greyscale.b100 : colors.black}
            backgroundColor={dutyRequest?.status === DutyRequestStatus.APPROVED ? colors.green : colors.yellow}
          />
                  
          {isString(dutyRequest?.note) && (
            <>
              <Styled.Divider />
              <Label size={"small"}>Observações</Label>
              <Label size={"medium"}>{dutyRequest?.note}</Label>
            </>
          )}
        </CardInfo>
      </Styled.Container>
      <Styled.Footer>
        <Button
          testID="delete-btn"
          title="Cancelar solicitação"
          onPress={onPressDelete}
          disabled={dutyRequest?.status !== DutyRequestStatus.PENDING}
          loading={isProcessing}
        />
      </Styled.Footer>
    </>
  );
};

export default DutyRequestDetails;

export const NavHeader = ({ navigation }: DutyRequestDetailsProps) => (
  <Header title="Solicitação de Plantão" onBackPress={navigation.goBack} />
);
