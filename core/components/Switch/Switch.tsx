import Flex from '../Flex';
import Label from '../Label';

import { StyledSwitch } from './Styles';
import type { SwitchProps } from '.';

const Switch = (props: SwitchProps) => {
  const { toggled, id, label, ...rest } = props;

  return (
    <Flex gap={2}>
      <StyledSwitch
        id={id}
        className="switch"
        role="switch"
        type="checkbox"
        checked={toggled}
        aria-checked={toggled}
        {...rest}
      />
      {label && <Label htmlFor={id}>{label}</Label>}
    </Flex>
  );
};

export default Switch;
