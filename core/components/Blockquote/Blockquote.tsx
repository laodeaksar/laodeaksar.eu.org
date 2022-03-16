import { StyledBlockquote } from './Styles';
import QuotationMark from './icons';

const Blockquote: React.FC = (props) => {
  const { children, ...rest } = props;

  return (
    <StyledBlockquote {...rest}>
      <QuotationMark className="quotation" />
      {children}
    </StyledBlockquote>
  );
};

export default Blockquote;
