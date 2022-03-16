import { forwardRef } from 'react';

import Flex from '~/components/Flex';

import { StyledButton, StyledIconButton } from './Styles';
import type { ButtonProps } from '.';

const Button = <T extends object>(
  props: ButtonProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const {
    variant = 'primary',
    children,
    glow,
    icon,
    startIcon,
    endIcon,
    as: Component,
    ...rest
  } = props;

  if (variant === 'icon') {
    return (
      <StyledIconButton as={Component} variant={variant} ref={ref} {...rest}>
        <Flex css={{ zIndex: 1 }}>{icon}</Flex>
      </StyledIconButton>
    );
  }

  return (
    <StyledButton as={Component} variant={variant} {...rest}>
      {startIcon && <Flex mr={2}>{startIcon}</Flex>}
      {children}
      {endIcon && <Flex ml={2}>{endIcon}</Flex>}
    </StyledButton>
  );
};

Button.displayName = 'Button';

const ForwadedButton = forwardRef(Button);

const WrappedButton = <T,>({
  ref,
  ...rest
}: ButtonProps<T> & { ref?: React.Ref<HTMLButtonElement> }) => (
  <ForwadedButton ref={ref} {...rest} />
);

export default WrappedButton;
