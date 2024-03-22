import moment from 'moment';
import { Alert } from 'react-native';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Label from "@screens/components/label";
import Button from "@screens/components/button";
import { DutyPosition, DutyShiftLabelTimes } from "@api/dutyRequest/types";
import CardInfo from '@screens/components/cardInfo';
import { Duty } from '@api/duty/types';
import useDutyForm from './useDutyForm';
import Loader from '@screens/components/loader';
import { User } from '@api/user/types';
import routeMap from '@routes/routeMap';
import DutyUserPosition from './components/dutyUserPosition';
import { isString } from '@utils/stringHelper';
import Styled from "./styles";

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
    isEditable,
    save,
    usersAlreadySelected,
    leaderRequests,
    driverRequests,
    rescuerRequests,
    radioOperatorRequests,
    assistantRadioOperatorRequests,
    traineeRequests,
  } = useDutyForm({ duty });
  console.log(assistantRadioOperatorRequests)

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
          <Label size='small'>Data</Label>
          <Label size='medium'>{moment(duty.date).format('dddd')}, {moment(duty.date).format('LL')}</Label>

          <Styled.Divider />

          <Label size='small'>Turno</Label>
          <Label size='medium'>{DutyShiftLabelTimes[duty.shift]}</Label>

          <Styled.Divider />

          <DutyUserPosition
            label='Líder'
            requestsCount={leaderRequests.length}
            dutyRequest={leaderRequests.find((dutyRequest) => dutyRequest.userId === leader?.id)}
            user={leader}
            placeholder='Selecione o líder'
            onRemove={() => setLeader(null)}
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                title: 'Selecione o líder',
                dutyRequests: leaderRequests,
                position: DutyPosition.LEADER,
                onSelect: (user: User) => setLeader(user),
                usersAlreadySelected
              })
            }}
            disabled={!isEditable}
          />

          <Styled.Divider />

          <DutyUserPosition
            label='Condutor'
            requestsCount={driverRequests.length}
            dutyRequest={driverRequests.find((dutyRequest) => dutyRequest.userId === driver?.id)}
            user={driver}
            placeholder='Selecione o condutor'
            onRemove={() => setDriver(null)}
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                title: 'Selecione o condutor',
                dutyRequests: driverRequests,
                position: DutyPosition.DRIVER,
                onSelect: (user: User) => setDriver(user),
                usersAlreadySelected
              })
            }}
            disabled={!isEditable}
          />
          
          <Styled.Divider />

          <DutyUserPosition
            label='1º Socorrista'
            requestsCount={rescuerRequests.length}
            dutyRequest={rescuerRequests.find((dutyRequest) => dutyRequest.userId === firstRescuer?.id)}
            user={firstRescuer}
            placeholder='Selecione o 1º Socorrista'
            onRemove={() => setFirstRescuer(null)}
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                title: 'Selecione o 1º Socorrista',
                dutyRequests: rescuerRequests,
                position: DutyPosition.RESCUER,
                onSelect: (user: User) => setFirstRescuer(user),
                usersAlreadySelected
              })
            }}
            disabled={!isEditable}
          />

          <Styled.Divider />

          <DutyUserPosition
            label='2º Socorrista'
            requestsCount={rescuerRequests.length}
            dutyRequest={rescuerRequests.find((dutyRequest) => dutyRequest.userId === secondRescuer?.id)}
            user={secondRescuer}
            placeholder='Selecione o 2º Socorrista'
            onRemove={() => setSecondRescuer(null)}
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                title: 'Selecione o 2º Socorrista',
                dutyRequests: rescuerRequests,
                position: DutyPosition.RESCUER,
                onSelect: (user: User) => setSecondRescuer(user),
                usersAlreadySelected
              })
            }}
            disabled={!isEditable}
          />

          <Styled.Divider />

          <DutyUserPosition
            label='Auxiliar de S.O.'
            requestsCount={assistantRadioOperatorRequests.length}
            dutyRequest={assistantRadioOperatorRequests.find((dutyRequest) => dutyRequest.userId === assistantRadioOperator?.id)}
            user={assistantRadioOperator}
            placeholder='Selecione o auxiliar de S.O.'
            onRemove={() => setAssistantRadioOperator(null)}
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                title: 'Selecione o auxiliar de S.O.',
                dutyRequests: assistantRadioOperatorRequests,
                position: DutyPosition.RADIO_OPERATOR,
                onSelect: (user: User) => setAssistantRadioOperator(user),
                usersAlreadySelected
              })
            }}
            disabled={!isEditable}
          />

          <Styled.Divider />

          <DutyUserPosition
            label='S.O.'
            requestsCount={radioOperatorRequests.length}
            dutyRequest={radioOperatorRequests.find((dutyRequest) => dutyRequest.userId === radioOperator?.id)}
            user={radioOperator}
            placeholder='Selecione o S.O.'
            onRemove={() => setRadioOperator(null)}
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                title: 'Selecione o S.O.',
                dutyRequests: radioOperatorRequests,
                position: DutyPosition.RADIO_OPERATOR,
                onSelect: (user: User) => setRadioOperator(user),
                usersAlreadySelected
              })
            }}
            disabled={!isEditable}
          />

          <Styled.Divider />

          <DutyUserPosition
            label='Estágio'
            requestsCount={traineeRequests.length}
            dutyRequest={traineeRequests.find((dutyRequest) => dutyRequest.userId === trainee?.id)}
            user={trainee}
            placeholder='Selecione o estagiário'
            onRemove={() => setTrainee(null)}
            onPress={() => {
              navigation.navigate(routeMap.DutyRoutes.DUTY_SELECT_USER, {
                title: 'Selecione o estagiário',
                dutyRequests: traineeRequests,
                position: DutyPosition.TRAINEE,
                onSelect: (user: User) => setTrainee(user),
                usersAlreadySelected
              })
            }}
            disabled={!isEditable}
          />

        </CardInfo>

        <Styled.Divider />
      </Styled.Container>
      <Styled.Footer>
        <Button
          testID="continue-btn"
          title="Salvar"
          onPress={onPressSave}
          loading={isProcessing}
          disabled={!isEditable}
        />
      </Styled.Footer>
    </>
  );
};

export default DutyForm;

export const NavHeader = ({ navigation }: DutyFormProps) => {
  return <Header title="Plantão" onBackPress={navigation.goBack} />
};
