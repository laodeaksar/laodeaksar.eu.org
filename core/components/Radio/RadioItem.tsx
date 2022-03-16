import { useContext } from 'react';

import { RadioContext } from './RadioContext';
import { StyledRadio } from './Styles';
import type { RadioItemProps } from '.';

import Flex from '~/components/Flex';
import Label from '~/components/Label';

const RadioItem = (props: RadioItemProps) => {
  const { id, checked, label, ...rest } = props;
  const radioContext = useContext(RadioContext);

  if (!radioContext) {
    console.warn('Radio.Item must be rendered within a Radio.Group component!');
    return null;
  }

  const { name, onChange } = radioContext;

  return (
    <Flex gap={2}>
      <StyledRadio
        id={id}
        role="radio"
        type="radio"
        aria-checked={checked}
        onChange={(e) => onChange(e)}
        name={name}
        checked={checked}
        {...rest}
      />
      <Label htmlFor={id}>{label}</Label>
    </Flex>
  );
};

RadioItem.displayName = 'RadioItem';

export default RadioItem;
