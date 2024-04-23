import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "@screens/components/header";
import CardHomeItem from "@screens/components/cardHomeItem";
import routeMap from "@routes/routeMap";
import Styled from "./styles";
import { SettingKey, SettingKeyLabel } from "@api/settings/types";

interface SettingsHomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const SettingsHome = ({ navigation }: SettingsHomeProps) => (
  <Styled.Container>
    <CardHomeItem
      title="Viaturas"
      subtitle="Gerencie os veículos da instituição"
      icon="truck-plus"
      iconType="material-community"
      onPress={() => {
        navigation.navigate(routeMap.SettingsRoutes.VEHICLE_LIST);
      }}
      size={40}
    />
    <CardHomeItem
      title={SettingKeyLabel[SettingKey.CITIES]}
      subtitle="Edite as cidades disponíveis"
      icon="add-location-alt"
      onPress={() => {
        navigation.navigate(routeMap.SettingsRoutes.SETTINGS_FORM, {
          settingKey: SettingKey.CITIES,
        });
      }}
      size={40}
    />
    <CardHomeItem
      title={SettingKeyLabel[SettingKey.DUTY_CARE_REASONS]}
      subtitle="Edite os motivos de atendimento"
      icon="playlist-add"
      onPress={() => {
        navigation.navigate(routeMap.SettingsRoutes.SETTINGS_FORM, {
          settingKey: SettingKey.DUTY_CARE_REASONS,
        });
      }}
      size={40}
    />
  </Styled.Container>
);

export default SettingsHome;

export const NavHeader = ({ navigation }: SettingsHomeProps) => (
  <Header title="Configurações" onBackPress={navigation.goBack} />
);
