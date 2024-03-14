import moment from 'moment';
import { Alert } from 'react-native';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Label from "@screens/components/label";
import Button from "@screens/components/button";
import { DutyPosition, DutyShiftLabelTimes } from "@api/dutyRequest/types";
import Styled from "./styles";
import CardInfo from '@screens/components/cardInfo';
import { Duty } from '@api/duty/types';
import useDutyForm from './useDutyForm';
import Loader from '@screens/components/loader';
import { User } from '@api/user/types';
import routeMap from '@routes/routeMap';
import DutyUserPosition from './components/dutyUserPosition';

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
    leader,
    setLeader,
    driver,
    setDriver,
    firstRescuer,
    setFirstRescuer,
    secondRescuer,
    setSecondRescuer,
    radioOperator,
    setRadioOperator,
    assistantRadioOperator,
    setAssistantRadioOperator,
    trainee,
    setTrainee,
    dutyRequestList,
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

  const leaderRequests = dutyRequestList.filter((dutyRequest) => dutyRequest.positions.includes(DutyPosition.LEADER));
  const driverRequests = dutyRequestList.filter((dutyRequest) => dutyRequest.positions.includes(DutyPosition.DRIVER));
  const rescuerRequests = dutyRequestList.filter((dutyRequest) => dutyRequest.positions.includes(DutyPosition.RESCUER));
  const radioOperatorRequests = dutyRequestList.filter((dutyRequest) => dutyRequest.positions.includes(DutyPosition.RADIO_OPERATOR));
  const traineeRequests = dutyRequestList.filter((dutyRequest) => dutyRequest.positions.includes(DutyPosition.TRAINEE));

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Styled.Container>
        <CardInfo>
          <Label size='small'>Data</Label>
          <Label size='medium'>{moment(duty.date).format('dddd')}, {moment(duty.date).format('LL')}</Label>

          <Styled.Divider />

          <Label size='small'>Turno</Label>
          <Label size='medium'>{DutyShiftLabelTimes[duty.shift]}</Label>

          <Styled.Divider />

          <DutyUserPosition
            label='Líder'
            user={leader}
            placeholder='Selecione um líder'
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                dutyRequests: leaderRequests,
                position: DutyPosition.LEADER,
                onSelect: (user: User) => setLeader(user)
              })
            }}
          />

          <Styled.Divider />

          <DutyUserPosition
            label='Condutor'
            user={driver}
            placeholder='Selecione um condutor'
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                dutyRequests: driverRequests,
                position: DutyPosition.DRIVER,
                onSelect: (user: User) => setDriver(user)
              })
            }}
          />
          
          <Styled.Divider />

          <DutyUserPosition
            label='1º Socorrista'
            user={firstRescuer}
            placeholder='Selecione um socorrista'
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                dutyRequests: rescuerRequests,
                position: DutyPosition.RESCUER,
                onSelect: (user: User) => setFirstRescuer(user)
              })
            }}
          />

          <Styled.Divider />

          <DutyUserPosition
            label='2º Socorrista'
            user={secondRescuer}
            placeholder='Selecione um socorrista'
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                dutyRequests: rescuerRequests,
                position: DutyPosition.RESCUER,
                onSelect: (user: User) => setSecondRescuer(user)
              })
            }}
          />

          <Styled.Divider />

          <DutyUserPosition
            label='Auxiliar de S.O.'
            user={assistantRadioOperator}
            placeholder='Selecione um auxiliar de S.O.'
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                dutyRequests: radioOperatorRequests,
                position: DutyPosition.RADIO_OPERATOR,
                onSelect: (user: User) => setAssistantRadioOperator(user)
              })
            }}
          />

          <Styled.Divider />

          <DutyUserPosition
            label='S.O.'
            user={radioOperator}
            placeholder='Selecione um S.O.'
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                dutyRequests: radioOperatorRequests,
                position: DutyPosition.RADIO_OPERATOR,
                onSelect: (user: User) => setRadioOperator(user)
              })
            }}
          />

          <Styled.Divider />

          <DutyUserPosition
            label='Estágio'
            user={trainee}
            placeholder='Selecione um estagiário'
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                dutyRequests: traineeRequests,
                position: DutyPosition.TRAINEE,
                onSelect: (user: User) => setTrainee(user)
              })
            }}
          />

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
