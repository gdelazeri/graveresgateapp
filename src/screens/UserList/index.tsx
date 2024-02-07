import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import Header from "@screens/components/header";
import Styled from "./styles";
import { useState } from "react";
import colors from "@theme/colors";
import { LabelSizeValue } from "@screens/components/label";
import fonts from "@theme/fonts";
import { FlatList, Text } from "react-native";
import { useUserList } from "./useUserList";

interface WelcomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const UserList = ({ navigation }: WelcomeProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading, list } = useUserList()

  return (
    <Styled.Container>
      <Searchbar 
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholderTextColor={colors.Greyscale.b60}
        style={{
          backgroundColor: colors.Greyscale.b100,
          fontSize: LabelSizeValue.medium,
          fontFamily: fonts.regular,
          color: colors.black,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: colors.Greyscale.b80,
          margin: 16
        }}
      />
      <FlatList
        data={list}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      />
    </Styled.Container>
  );
};

export default UserList;

export const NavHeader = () => <Header title="Equipe" />;
