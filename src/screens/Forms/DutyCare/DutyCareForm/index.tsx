import { useMemo, useState } from "react";
import { Alert } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import CardInfo from "@screens/components/cardInfo";
import Label from "@screens/components/label";
import RadioGroup from "@screens/components/radioGroup";
import Loader from "@screens/components/loader";
import FooterContainer from "@screens/components/footerContainer";
import Button from "@screens/components/button";
import Select from "@screens/components/select";
import Input from "@screens/components/input";
import { INPUT_TYPE } from "@screens/components/input/types";
import DateInput from "@screens/components/dateInput";
import TimeInput from "@screens/components/timeInput";
import {
  DutyCareChecklistIncidentContinuation,
  DutyCareChecklistIncidentContinuationLabel
} from "@api/dutyCareChecklist/types";
import Styled from "./styles";
import { useDutyCareForm } from "./useDutyCareForm";
import BasicInfo from "./components/basicInfo";
import VictimInfo from "./components/victimInfo";
import LocationInfo from "./components/locationInfo";
import EvolutionInfo from "./components/evolutionInfo";
import ChecklistInfo from "./components/checklistInfo";

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
    checklistQuestions,
    form,
    setFormValue,
    setFormChecklistQuestionValue,
    isFormValid,
    save
  } = useDutyCareForm()

  const onPressContinue = async () => {
    if (pageIndex < PageIndex.EVOLUTION_INFO) {
      setPageIndex(pageIndex + 1);
      return;
    }

    const response = await save();

    if (response.success) {
      
    } else {
      Alert.alert(
        'Erro ao salvar a ficha de atendimento',
        'Ocorreu algum erro ao salvar o formulário, verifique os dados e tente novamente.',
        [{ text: 'OK' }]
      )
    }
  }

  const pageIndexRenderer = useMemo(() => {
    switch (pageIndex) {
      case PageIndex.BASIC_INFO:
        return <BasicInfo form={form} setFormValue={setFormValue} vehicleList={vehicleList} />;
      case PageIndex.VICTIM_INFO:
        return <VictimInfo form={form} setFormValue={setFormValue} />;
      case PageIndex.LOCATION_INFO:
        return <LocationInfo form={form} setFormValue={setFormValue} />;
      case PageIndex.CHECKLIST_INFO:
        return <ChecklistInfo form={form} setFormChecklistQuestionValue={setFormChecklistQuestionValue} checklistQuestions={checklistQuestions} />;
      case PageIndex.EVOLUTION_INFO:
        return <EvolutionInfo form={form} setFormValue={setFormValue} />;
    }
  }, [pageIndex, form, setFormValue, vehicleList])

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
              onPress={() => setPageIndex(pageIndex - 1)}
              disabled={pageIndex === PageIndex.BASIC_INFO}
              loading={isProcessing}
              secondary
            />
          </Styled.InlineInput>
          <Styled.InlineInput style={{ paddingLeft: 4 }}>
            <Button
              title="Próximo"
              onPress={onPressContinue}
              disabled={!isFormValid}
              loading={isProcessing}
            />
          </Styled.InlineInput>
        </Styled.InlineInputContainer>
      </FooterContainer>
    </Styled.Container>
  );
};

export default DutyCareForm;

export const NavHeader = ({ navigation }: DutyCareFormProps) => (
  <Header onBackPress={navigation.goBack} title="Ficha de Atendimento" />
);
