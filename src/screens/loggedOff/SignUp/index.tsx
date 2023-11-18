import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Header from '../../components/header';
import Button from '../../components/button';
import Styled from './styles';
import Label from '../../components/label';

interface SignUpProps {
  navigation: NavigationProp<ParamListBase>
}

const SignUp = () => {
  return <Styled.Container>
    <Label size={'medium'}>Preencha seus dados nos campos abaixo:</Label>
    <Button
      title='Continuar'
      onPress={() => {}}
    />
  </Styled.Container>
}

export default SignUp

export const NavHeader = ({ navigation }: SignUpProps) => (
  <Header
    title='Criar conta'
    onBackPress={navigation.goBack}
  />
)