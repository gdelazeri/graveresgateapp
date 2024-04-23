import Label from "@screens/components/label";
import Styled from "./styles";
import EmptyList from "@screens/components/emptyList";

interface ListHeaderProps {
  title: string;
  isEmpty: boolean;
}

const ListHeader = ({ title, isEmpty }: ListHeaderProps) => (
  <>
    <Styled.Container>
      <Label size="small" bold>
        {title}
      </Label>
    </Styled.Container>
    {isEmpty && (
      <Styled.EmptyContainer>
        <EmptyList text="Nenhum voluntário" />
      </Styled.EmptyContainer>
    )}
  </>
);

export default ListHeader;
