import moment from 'moment';
import { Alert } from 'react-native';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Label from "@screens/components/label";
import Button from "@screens/components/button";
import { DutyShiftLabelTimes } from "@api/dutyRequest/types";
import Styled from "./styles";
import CardInfo from '@screens/components/cardInfo';
import { Duty } from '@api/duty/types';
import useDutyForm from './useDutyForm';
import Loader from '@screens/components/loader';
import colors from '@theme/colors';

interface DutyFormProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      duty: Duty;
    }
  }
}

const DutyForm = ({ navigation, route }: DutyFormProps) => {
  const { duty } = route.params;
  const {
    isLoading,
    isProcessing,
    leaderId,
    setLeaderId,
    driverId,
    setDriverId,
    firstRescuerId,
    setFirstRescuerId,
    secondRescuerId,
    setsScondRescuerId,
    radioOperatorId,
    setRadioOperatorId,
    assistantRadioOperatorId,
    setAssistantRadioOperatorId,
    traineeId,
    setTraineeId,
    save
  } = useDutyForm({ duty });

  const onPressSave = async () => {
    const response = await save();

    if (response.success && response.result) {
      navigation.goBack();
    } else {
      Alert.alert(
        'Erro ao salvar',
        'Ocorreu algum erro ao salvar a escala do plantão, tente novamente.',
        [{ text: 'OK' }]
      )
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Styled.Container>
        <CardInfo>
          <Label size='small' color={colors.Greyscale.b50}>Data</Label>
          <Label size='medium'>{moment(duty.date).format('dddd')}, {moment(duty.date).format('LL')}}</Label>

          <Styled.Divider />

          <Label size='small' color={colors.Greyscale.b50}>Turno</Label>
          <Label size='medium'>{DutyShiftLabelTimes[duty.shift]}</Label>
        </CardInfo>
      </Styled.Container>
      <Styled.Footer>
        <Button
          testID="continue-btn"
          title="Salvar"
          onPress={onPressSave}
          loading={isProcessing}
        />
      </Styled.Footer>
    </>
  );
};

export default DutyForm;

export const NavHeader = ({ navigation }: DutyFormProps) => {
  return <Header title="Plantão" onBackPress={navigation.goBack} />
};
