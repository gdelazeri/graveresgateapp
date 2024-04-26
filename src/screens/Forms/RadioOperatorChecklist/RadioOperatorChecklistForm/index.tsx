import { useMemo, useState } from "react";
import { Alert } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  StackActions,
} from "@react-navigation/native";
import Header from "@screens/components/header";
import Loader from "@screens/components/loader";
import FooterContainer from "@screens/components/footerContainer";
import Button from "@screens/components/button";
import Styled from "./styles";
import { useRadioOperatorChecklistForm } from "./useRadioOperatorChecklistForm";
import BasicInfo from "./components/basicInfo";
import { isString } from "@utils/stringHelper";
import routeMap from "@routes/routeMap";
import Toast from "react-native-toast-message";
import ChecklistQuestions from "@screens/components/checklistQuestions";

interface RadioOperatorChecklistFormProps {
  navigation: NavigationProp<ParamListBase>;
}

enum PageIndex {
  BASIC_INFO,
  CHECKLIST_INFO,
}

const RadioOperatorChecklistForm = ({ navigation }: RadioOperatorChecklistFormProps) => {
  const [pageIndex, setPageIndex] = useState<PageIndex>(PageIndex.BASIC_INFO);
  const {
    isLoading,
    isProcessing,
    dutyList,
    checklistQuestions,
    form,
    setFormValue,
    setFormChecklistQuestionValue,
    save,
  } = useRadioOperatorChecklistForm();

  const onPressContinue = async () => {
    if (pageIndex < PageIndex.CHECKLIST_INFO) {
      setPageIndex(pageIndex + 1);
      return;
    }

    const response = await save();

    if (response.success && response.result) {
      Toast.show({
        type: "success",
        text1: "Checklist S.O.",
        text2: "Salvo com sucesso!",
        position: "bottom",
      });
      navigation.dispatch(
        StackActions.replace(routeMap.FormsRoutes.RADIO_OPERATOR_CHECKLIST_DETAILS, {
          id: response.result.id,
        }),
      );
    } else {
      Alert.alert(
        "Erro ao salvar o checklist do S.O.",
        "Ocorreu algum erro ao salvar o formulário, verifique os dados e tente novamente.",
        [{ text: "OK" }],
      );
    }
  };

  const onPressGoBack = async () => {
    if (pageIndex > PageIndex.BASIC_INFO) {
      setPageIndex(pageIndex - 1);
    }
  };

  const pageIndexRenderer = useMemo(() => {
    switch (pageIndex) {
      case PageIndex.BASIC_INFO:
        return (
          <BasicInfo
            form={form}
            setFormValue={setFormValue}
            dutyList={dutyList}
          />
        );
      case PageIndex.CHECKLIST_INFO:
        return (
          <ChecklistQuestions
            form={form}
            setFormChecklistQuestionValue={setFormChecklistQuestionValue}
            checklistQuestions={checklistQuestions}
          />
        );
    }
  }, [pageIndex, form, setFormValue, dutyList]);

  const isNextEnabled = useMemo(() => {
    switch (pageIndex) {
      case PageIndex.BASIC_INFO:
        return (
          isString(form.dutyId)
        );
      case PageIndex.CHECKLIST_INFO:
        return (
          checklistQuestions?.questions
            .filter(
              (question) => question.required && question.items?.length === 0,
            )
            .map((question) => question.id)
            .every((questionId) =>
              (form.checklistAnswers || [])
                .map((answer) => answer.checklistQuestionId)
                .includes(questionId),
            ) &&
          checklistQuestions?.questions
            .filter(
              (question) => question.required && question.items?.length > 0,
            )
            .map(
              (question) =>
                question.items?.map((item) => ({
                  question: question.id,
                  item: item.text,
                })),
            )
            .flat()
            .every((obj) =>
              (form.checklistAnswers || [])
                .map((answer) => ({
                  question: answer.checklistQuestionId,
                  item: answer.checklistQuestionItem,
                }))
                .find(
                  (x) => x.item === obj.item && x.question === obj.question,
                ),
            )
        );
    }
  }, [pageIndex, form]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      <Styled.ScrollView>{pageIndexRenderer}</Styled.ScrollView>
      <FooterContainer>
        <Styled.InlineInputContainer>
          <Styled.InlineInput style={{ paddingRight: 4 }}>
            <Button
              title="Voltar"
              onPress={onPressGoBack}
              disabled={pageIndex === PageIndex.BASIC_INFO || isProcessing}
              secondary
            />
          </Styled.InlineInput>
          <Styled.InlineInput style={{ paddingLeft: 4 }}>
            <Button
              title={
                pageIndex < PageIndex.CHECKLIST_INFO ? "Próximo" : "Finalizar"
              }
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

export default RadioOperatorChecklistForm;

export const NavHeader = ({ navigation }: RadioOperatorChecklistFormProps) => {
  const onGoBack = () => {
    Alert.alert(
      "Deseja voltar para a tela anterior?",
      "Ao voltar você perderá todos os dados preenchidos.",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: navigation.goBack,
        },
      ],
    );
  };

  return <Header onBackPress={onGoBack} title="Checklist S.O." />;
};
