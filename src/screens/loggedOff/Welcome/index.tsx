import Button from '../../components/button';
import Styled from './styles';

const Welcome = () => {
  return <Styled.Container>
    <Styled.ImageLogo />
    <Styled.Buttons>
      <Button
        title='Fazer login'
      />
      <Styled.Divider />
      <Button
        title='Criar conta'
        secondary
      />
    </Styled.Buttons>
  </Styled.Container>
}

export default Welcome
