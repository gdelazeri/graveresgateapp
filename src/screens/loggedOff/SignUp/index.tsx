import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useState } from 'react';

import Header from '../../components/header';
import Label from '../../components/label';
import Styled from './styles';
import Input from '../../components/input';

interface SignUpProps {
  navigation: NavigationProp<ParamListBase>
}

const SignUp = ({ navigation }: SignUpProps) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  return <Styled.Container>
    <Label size={'medium'}>Preencha seus dados nos campos abaixo:</Label>
    <Styled.Divider />
    <Input
      label="Nome completo"
      placeholder="Seu nome completo"
      value={fullName}
      onChangeText={setFullName}
    />
    <Styled.Divider />
    <Input
      label="E-mail"
      placeholder="Seu e-mail"
      value={email}
      onChangeText={setEmail}
    />
    <Styled.Divider />
    <Input
      label="Celular"
      placeholder="Seu número de celular"
      value={phone}
      onChangeText={setPhone}
      // isPhone
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