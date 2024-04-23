import moment from 'moment';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Label from "@screens/components/label";
import { DutyShiftLabel } from "@api/dutyRequest/types";
import CardInfo from '@screens/components/cardInfo';
import useDutyDetails from './useDutyDetails';
import Loader from '@screens/components/loader';
import Styled from "./styles";
import { Duty } from '@api/duty/types';
import { isString } from '@utils/stringHelper';
import colors from '@theme/colors';
import EmptyList from '@screens/components/emptyList';
import routeMap from '@routes/routeMap';
import DutyCareListItem from '@screens/components/dutyCareListItem';
import { ChecklistType, DutyChecklist } from '@api/checklist/types';
import FooterContainer from '@screens/components/footerContainer';
import Button from '@screens/components/button';
import { useState } from 'react';
import Modal from '@screens/components/modal';
import Input from '@screens/components/input';
import { INPUT_TYPE } from '@screens/components/input/types';
import { Alert } from 'react-native';

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
    isProcessing,
    isEditable,
    leader,
    driver,
    firstRescuer,
    secondRescuer,
    radioOperator,
    assistantRadioOperator,
    trainee,
    isAvailable,
    note,
    setNote,
    dutyCareChecklists,
    dutyChecklists,
    saveAsAvailable,
    saveAsUnavailable,
  } = useDutyDetails({ duty });
  const [isModalOpened, setIsModalOpened] = useState(false);

  const onPressChecklist = (dutyChecklist: DutyChecklist) => {
    switch (dutyChecklist.type) {
      case ChecklistType.DRIVER:
        return navigation.navigate(routeMap.FormsRoutes.STACK, {
          screen: routeMap.FormsRoutes.DRIVER_CHECKLIST_DETAILS,
          params: { id: dutyChecklist.id }
        })
      case ChecklistType.RADIO_OPERATOR:
        return navigation.navigate(routeMap.FormsRoutes.STACK, {
          screen: routeMap.FormsRoutes.RADIO_OPERATOR_CHECKLIST_DETAILS,
          params: { id: dutyChecklist.id }
        })
      case ChecklistType.RESCUER:
        return navigation.navigate(routeMap.FormsRoutes.STACK, {
          screen: routeMap.FormsRoutes.RESCUER_CHECKLIST_DETAILS,
          params: { id: dutyChecklist.id }
        })
    }
  }

  const onPressSaveAsUnavailable = async () => {
    await saveAsUnavailable();
    setIsModalOpened(false);
  }

  const onPressSaveAsAvailable = async () => {
    Alert.alert(
      'Plantão em QAP',
      'Deseja realmente alterar o status do plantão para QAP?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: saveAsAvailable }
      ]
    )
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Styled.ScrollView>
        {!isAvailable && <>
          <CardInfo title='Plantão em FA' borderColor={colors.red}>
            <Label size='medium'>{note}</Label>
          </CardInfo>
          <Styled.Divider />
        </>}

        <CardInfo title='Equipe do plantão' onPressEdit={isEditable && isAvailable ? () => navigation.navigate(routeMap.DutyRoutes.DUTY_FORM, { duty }) : undefined}>
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

        <CardInfo title='Checklists'>
          {dutyChecklists.length === 0 && <EmptyList text='Nenhum checklist preenchido' />}
          {dutyChecklists.map((item, index) => (
            <Styled.Item key={item.id} onPress={() => onPressChecklist(item)}>
              <Label size='medium'>{item.checklistName}</Label>
              {index < dutyCareChecklists.length - 1 && <Styled.Divider />}
            </Styled.Item>
          ))}
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
      {isEditable && (
        <FooterContainer>
          {isAvailable && <Button
            title='Alterar plantão para FA'
            onPress={() => setIsModalOpened(true)}
            loading={isProcessing}
            secondary
          />}
          {!isAvailable && <Button
            title='Alterar plantão para QAP'
            onPress={onPressSaveAsAvailable}
            loading={isProcessing}
            secondary
          />}
          <Modal isOpen={isModalOpened} onClose={() => setIsModalOpened(false)}>
            <Label size='medium'>Plantão em FA</Label>
            <Input
              placeholder='Informe a justificativa para o status FA'
              type={INPUT_TYPE.TEXT}
              onChangeText={setNote}
              value={note}
              autoFocus
            />
            <Styled.Divider />
            <Button
              title='Salvar'
              onPress={onPressSaveAsUnavailable}
              loading={isProcessing}
              disabled={!isString(note)}
            />
        </Modal>
      </FooterContainer>
      )}

    </>
  );
};

export default DutyDetails;

export const NavHeader = ({ navigation, route: { params: { duty } } }: DutyDetailsProps) => {
  const title = `${moment(duty.date).format('ddd')}, ${moment(duty.date).format('LL')} - ${DutyShiftLabel[duty.shift]}`
  return <Header title={title} onBackPress={navigation.goBack} />
};
