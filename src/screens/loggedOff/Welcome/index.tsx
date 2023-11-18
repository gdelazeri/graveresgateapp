import Button from '../../components/button';
import Styled from './styles';

const Welcome = () => {
  return <Styled.Container>
    <Styled.ImageLogo />
    <Styled.Buttons>
      <Button
        title='Criar conta'
      />
      <Styled.Divider />
      <Button
        title='Fazer login'
        secondary
      />
    </Styled.Buttons>
  </Styled.Container>
}

export default Welcome
