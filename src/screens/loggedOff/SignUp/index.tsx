import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Header from '../../components/header';
import Styled from './styles';
import Label from '../../components/label';

interface SignUpProps {
  navigation: NavigationProp<ParamListBase>
}

const SignUp = ({ navigation }: SignUpProps) => {
  return <Styled.Container>
    <Label size={'medium'}>Preencha seus dados nos campos abaixo:</Label>
  </Styled.Container>
}

export default SignUp

export const NavHeader = ({ navigation }: SignUpProps) => (
  <Header
    title='Criar conta'
    onBackPress={navigation.goBack}
  />
)