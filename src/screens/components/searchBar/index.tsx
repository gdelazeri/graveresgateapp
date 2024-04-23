import colors from "@theme/colors";
import { Searchbar } from "react-native-paper";
import { LabelSizeValue } from "../label/types";
import fonts from "@theme/fonts";

interface SearchBarProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
}

const SearchBar = ({ placeholder, onChangeText, value }: SearchBarProps) => (
  <Searchbar
    placeholder={placeholder}
    onChangeText={onChangeText}
    value={value}
    placeholderTextColor={colors.Greyscale.b60}
    style={{
      backgroundColor: colors.Greyscale.b100,
      fontSize: LabelSizeValue.medium,
      fontFamily: fonts.regular,
      color: colors.black,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.Greyscale.b80,
      margin: 16,
    }}
    testID="search-bar"
  />
);

export default SearchBar;
