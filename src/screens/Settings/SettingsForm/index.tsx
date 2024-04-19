import { Alert, FlatList } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import Header from "@screens/components/header";
import Button from "@screens/components/button";
import useSettingForm from "./useSettingForm";
import CardInfo from "@screens/components/cardInfo";
import Input from "@screens/components/input";
import { SettingKey, SettingKeyLabel } from "@api/settings/types";
import Loader from "@screens/components/loader";
import colors from "@theme/colors";
import { isString } from "@utils/stringHelper";
import SettingItem from "./components/settingItem";
import Styled from "./styles";
import Toast from "react-native-toast-message";

interface SettingsFormProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      settingKey: SettingKey;
    }
  }
}

const SettingsForm = ({ navigation, route }: SettingsFormProps) => {
  const { settingKey } = route?.params || {};
  const {
    list,
    setList,
    text,
    setText,
    isProcessing,
    isLoading,
    save
  } = useSettingForm({ settingKey });

  const onPressSave = async () => {
    const response = await save();

    if (response.success && response.result) {
      Toast.show({
        type: 'success',
        text1: SettingKeyLabel[settingKey],
        text2: 'Salvo com sucesso!',
        position: 'bottom',
      })

      navigation.goBack();
    } else {
      Alert.alert(
        'Erro ao salvar',
        'Ocorreu algum erro ao salvar, verifique os dados e tente novamente.',
        [{ text: 'OK' }]
      )
    }
  }

  const onPressAdd = async () => {
    setList([...list, text]);
    setText("");
  }

  const onPressDelete = (index: number) => {
    Alert.alert(
      'Deseja realmente remover esse item?',
      '',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: () => onDeleteFromList(index)
        }
      ]
    )
  }

  const onDeleteFromList = (index: number) => {
    const newList = [...list].filter((_, i) => i !== index);
    setList([...newList]);
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <CardInfo>
        <Styled.InlineContainer>
          <Styled.InputValue>
            <Input
              label=""
              value={text}
              onChangeText={setText}
              placeholder="Cadastre novo item aqui..."
            />
          </Styled.InputValue>
          <Styled.IconButton disabled={!isString(text)} onPress={onPressAdd}>
            <Icon name="add-circle" size={32} color={isString(text) ? colors.green : colors.Greyscale.b80} />
          </Styled.IconButton>
        </Styled.InlineContainer>
      </CardInfo>

      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <SettingItem value={item} onPressDelete={() => onPressDelete(index)} />
        )}
        ItemSeparatorComponent={() => <Styled.DividerLine />}
      />
      <Styled.Footer>
        <Button
          title="Salvar"
          onPress={onPressSave}
          loading={isProcessing}
        />
      </Styled.Footer>
    </>
  );
};

export default SettingsForm;

export const NavHeader = ({ navigation, route }: SettingsFormProps) => {
  const { settingKey } = route.params;
  const title = SettingKeyLabel[settingKey];

  return (
    <Header onBackPress={navigation.goBack} title={title} />
  )
}
