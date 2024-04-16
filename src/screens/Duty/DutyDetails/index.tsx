import moment from 'moment';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Label from "@screens/components/label";
import { DutyShiftLabelTimes } from "@api/dutyRequest/types";
import CardInfo from '@screens/components/cardInfo';
import useDutyDetails from './useDutyDetails';
import Loader from '@screens/components/loader';
import Styled from "./styles";
import { Duty } from '@api/duty/types';
import { formatAddress, isString } from '@utils/stringHelper';
import colors from '@theme/colors';
import EmptyList from '@screens/components/emptyList';
import routeMap from '@routes/routeMap';
import { View } from 'react-native';
import DutyCareListItem from '@screens/components/dutyCareListItem';

interface DutyDetailsProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      duty: Duty;
    }
  }
}

const DutyDetails = ({ navigation, route }: DutyDetailsProps) => {
  const { duty } = route.params;
  const {
    isLoading,
    leader,
    driver,
    firstRescuer,
    secondRescuer,
    radioOperator,
    assistantRadioOperator,
    trainee,
    dutyCareChecklists
  } = useDutyDetails({ duty });

  if (isLoading) {
    return <Loader />
  }

  return (
    <Styled.ScrollView>
      <CardInfo title='Equipe do plantão' onPressEdit={() => navigation.navigate(routeMap.DutyRoutes.DUTY_FORM, { duty })}>
        <Label size='small' color={colors.Greyscale.b50}>Data</Label>
        <Label size='medium'>{moment(duty.date).format('dddd')}, {moment(duty.date).format('LL')}</Label>

        <Styled.Divider />

        <Label size='small' color={colors.Greyscale.b50}>Turno</Label>
        <Label size='medium'>{DutyShiftLabelTimes[duty.shift]}</Label>

        <Styled.Divider />

        <Label size='small' color={colors.Greyscale.b50}>Líder</Label>
        <Label size='medium'>{isString(leader?.name) ? leader?.name : '-'}</Label>

        <Styled.Divider />

        <Label size='small' color={colors.Greyscale.b50}>Condutor</Label>
        <Label size='medium'>{isString(driver?.name) ? driver?.name : '-'}</Label>

        <Styled.Divider />

        <Label size='small' color={colors.Greyscale.b50}>1º Socorrista</Label>
        <Label size='medium'>{isString(firstRescuer?.name) ? firstRescuer?.name : '-'}</Label>

        <Styled.Divider />

        <Label size='small' color={colors.Greyscale.b50}>2º Socorrista</Label>
        <Label size='medium'>{isString(secondRescuer?.name) ? secondRescuer?.name : '-'}</Label>

        <Styled.Divider />

        <Label size='small' color={colors.Greyscale.b50}>Auxiliar de S.O.</Label>
        <Label size='medium'>{isString(assistantRadioOperator?.name) ? assistantRadioOperator?.name : '-'}</Label>

        <Styled.Divider />

        <Label size='small' color={colors.Greyscale.b50}>S.O.</Label>
        <Label size='medium'>{isString(radioOperator?.name) ? radioOperator?.name : '-'}</Label>

        <Styled.Divider />

        <Label size='small' color={colors.Greyscale.b50}>Estágio</Label>
        <Label size='medium'>{isString(trainee?.name) ? trainee?.name : '-'}</Label>
      </CardInfo>

      <Styled.Divider />

      <CardInfo title='Fichas de atendimento'>
        {dutyCareChecklists.length === 0 && <EmptyList text='Nenhuma ficha de atendimento' />}
        {dutyCareChecklists.map((item, index) => (
          <Styled.Item key={item.id} onPress={() => navigation.navigate(routeMap.FormsRoutes.STACK, {
            screen: routeMap.FormsRoutes.DUTY_CARE_DETAILS,
            params: { id: item.id }
          })}>
            <DutyCareListItem item={item} />
            {index < dutyCareChecklists.length - 1 && <Styled.DividerLine />}
          </Styled.Item>
        ))}
      </CardInfo>
    </Styled.ScrollView>
  );
};

export default DutyDetails;

export const NavHeader = ({ navigation }: DutyDetailsProps) => {
  return <Header title="Detalhes do plantão" onBackPress={navigation.goBack} />
};
