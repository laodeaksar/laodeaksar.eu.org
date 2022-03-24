import { forwardRef } from 'react';

import Flex from '~/components/Flex';

import { StyledButton, StyledIconButton } from './Styles';
import type { ButtonProps } from '.';
import trackEvent from '~/lib/tracking';

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
    onClick,
    tracking,
    as: Component,
    ...rest
  } = props;

  function handleOnClick(event) {
    if (tracking) {
      trackEvent(tracking);
    }
    if (onClick) {
      onClick(event);
    }
  }

  if (variant === 'icon') {
    return (
      <StyledIconButton
        as={Component}
        variant={variant}
        onClick={handleOnClick}
        ref={ref}
        {...rest}
      >
        <Flex css={{ zIndex: 1 }}>{icon}</Flex>
      </StyledIconButton>
    );
  }

  return (
    <StyledButton
      as={Component}
      variant={variant}
      onClick={handleOnClick}
      {...rest}
    >
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
