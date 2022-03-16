import Flex from '~/components/Flex';
import Label from '~/components/Label';

import { StyledCheckbox } from './Styles';
import type { CheckboxProps } from '.';

const Checkbox = (props: CheckboxProps) => {
  const { checked, disabled, id, label, ...rest } = props;
  return (
    <Flex gap={2}>
      <StyledCheckbox
        id={id}
        type="checkbox"
        role="checkbox"
        aria-checked={checked}
        checked={checked}
        disabled={disabled}
        {...rest}
      />
      {label && <Label htmlFor={id}>{label}</Label>}
    </Flex>
  );
};
export default Checkbox;
