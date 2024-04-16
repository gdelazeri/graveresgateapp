import { useMemo, useState } from "react";
import { Alert } from "react-native";
import { NavigationProp, ParamListBase, StackActions } from "@react-navigation/native";
import Header from "@screens/components/header";
import Loader from "@screens/components/loader";
import FooterContainer from "@screens/components/footerContainer";
import Button from "@screens/components/button";
import {
  DutyCareChecklistIncidentContinuation,
} from "@api/dutyCareChecklist/types";
import Styled from "./styles";
import { useDutyCareForm } from "./useDutyCareForm";
import BasicInfo from "./components/basicInfo";
import VictimInfo from "./components/victimInfo";
import LocationInfo from "./components/locationInfo";
import EvolutionInfo from "./components/evolutionInfo";
import ChecklistInfo from "./components/checklistInfo";
import { isString } from "@utils/stringHelper";
import routeMap from "@routes/routeMap";

interface DutyCareFormProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      id?: string
    }
  }
}

enum PageIndex {
  BASIC_INFO,
  VICTIM_INFO,
  LOCATION_INFO,
  CHECKLIST_INFO,
  EVOLUTION_INFO
}

const DutyCareForm = ({ navigation, route }: DutyCareFormProps) => {
  const { id } = route.params || {};
  const [pageIndex, setPageIndex] = useState<PageIndex>(PageIndex.BASIC_INFO)
  const {
    isLoading,
    isProcessing,
    vehicleList,
    dutyList,
    reasonList,
    cityList,
    checklistQuestions,
    form,
    setFormValue,
    setFormChecklistQuestionValue,
    save
  } = useDutyCareForm()

  const onPressContinue = async () => {
    if (pageIndex < PageIndex.EVOLUTION_INFO) {
      if (pageIndex === PageIndex.LOCATION_INFO && form.incidentContinuation === DutyCareChecklistIncidentContinuation.REFUSED) {
        setPageIndex(PageIndex.EVOLUTION_INFO);
      } else {
        setPageIndex(pageIndex + 1);
      }
      return;
    }

    const response = await save();

    if (response.success && response.result) {
      navigation.dispatch(
        StackActions.replace(routeMap.FormsRoutes.DUTY_CARE_DETAILS, { id: response.result.id })
      );
    } else {
      Alert.alert(
        'Erro ao salvar a ficha de atendimento',
        'Ocorreu algum erro ao salvar o formulário, verifique os dados e tente novamente.',
        [{ text: 'OK' }]
      )
    }
  }

  const onPressGoBack = async () => {
    if (pageIndex > PageIndex.BASIC_INFO) {
      if (pageIndex === PageIndex.EVOLUTION_INFO && form.incidentContinuation === DutyCareChecklistIncidentContinuation.REFUSED) {
        setPageIndex(PageIndex.LOCATION_INFO);
      } else {
        setPageIndex(pageIndex - 1);
      }
    }
  }

  const pageIndexRenderer = useMemo(() => {
    switch (pageIndex) {
      case PageIndex.BASIC_INFO:
        return <BasicInfo
          form={form}
          setFormValue={setFormValue}
          dutyList={dutyList}
          vehicleList={vehicleList}
          reasonList={reasonList}
        />;
      case PageIndex.VICTIM_INFO:
        return <VictimInfo form={form} setFormValue={setFormValue} />;
      case PageIndex.LOCATION_INFO:
        return <LocationInfo form={form} setFormValue={setFormValue} cityList={cityList} />;
      case PageIndex.CHECKLIST_INFO:
        return <ChecklistInfo
          form={form}
          setFormChecklistQuestionValue={setFormChecklistQuestionValue}
          checklistQuestions={checklistQuestions}
        />;
      case PageIndex.EVOLUTION_INFO:
        return <EvolutionInfo form={form} setFormValue={setFormValue} />;
    }
  }, [pageIndex, form, setFormValue, dutyList, vehicleList, reasonList])

  const isNextEnabled = useMemo(() => {
    switch (pageIndex) {
      case PageIndex.BASIC_INFO:
        return (
          isString(form.dutyId) && isString(form.date) && isString(form.time) && isString(form.vehicleId) && isString(form.reason)
        );
      case PageIndex.VICTIM_INFO:
        return (
          isString(form.victimName) && isString(form.victimAge) && isString(form.victimGender)
        );
      case PageIndex.LOCATION_INFO:
        return (
          isString(form.incidentAddress) && isString(form.incidentAddressCity) && isString(form.incidentAddressDistrict) && isString(form.incidentContinuation)
        );
      case PageIndex.CHECKLIST_INFO:
        return (
          checklistQuestions?.questions.filter(question => question.required).map(question => question.id).every(questionId => (form.checklistAnswers || []).map(answer => answer.checklistQuestionId).includes(questionId))
        )
      case PageIndex.EVOLUTION_INFO:
        return (
          isString(form.incidentEvolution)
        );
    }
  }, [pageIndex, form])

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <Styled.Container>
      <Styled.ScrollView>
        {pageIndexRenderer}
      </Styled.ScrollView>
      <FooterContainer>
        <Styled.InlineInputContainer>
          <Styled.InlineInput style={{ paddingRight: 4 }}>
            <Button
              title="Voltar"
              onPress={onPressGoBack}
              disabled={pageIndex === PageIndex.BASIC_INFO}
              loading={isProcessing}
              secondary
            />
          </Styled.InlineInput>
          <Styled.InlineInput style={{ paddingLeft: 4 }}>
            <Button
              title={pageIndex < PageIndex.EVOLUTION_INFO ? "Próximo" : "Finalizar"}
              onPress={onPressContinue}
              disabled={!isNextEnabled}
              loading={isProcessing}
            />
          </Styled.InlineInput>
        </Styled.InlineInputContainer>
      </FooterContainer>
    </Styled.Container>
  );
};

export default DutyCareForm;

export const NavHeader = ({ navigation }: DutyCareFormProps) => {
  const onGoBack = () => {
    Alert.alert(
      'Deseja voltar para a tela anterior?',
      'Ao voltar você perderá todos os dados preenchidos.',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: navigation.goBack
        }
      ]
    )
  }

  return <Header onBackPress={onGoBack} title="Ficha de Atendimento" />
};
