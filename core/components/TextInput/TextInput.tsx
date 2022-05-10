import { useCallback, forwardRef, useMemo, useState } from 'react';

import Label from '~/components/Label';
import Box from '~/components/Box';

import { AtSignIcon, EyeIcon, Tick } from './Icons';
import { StyledInput, StyledInputWrapper } from './Styles';
import { validateEmail } from './utils';
import type { TextInputProps } from './types';

const TextInput = forwardRef(
  (props: TextInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      id,
      disabled,
      label,
      type = 'text',
      placeholder,
      value,
      ...rest
    } = props;

    const [showPassword, setShowPassword] = useState(false);
    const isValid = useMemo(() => validateEmail(value || ''), [value]);

    const computedType = useCallback(() => {
      if (type === 'password' && showPassword) {
        return 'text';
      }
      return type;
    }, [showPassword, type]);

    return (
      <StyledInputWrapper className={isValid ? 'valid' : ''} variant={type}>
        {label && (
          <Label
            htmlFor={id}
            style={{
              marginBottom: '8px'
            }}
          >
            {label}
          </Label>
        )}
<Box css={{ position: 'relative' }}>
        <StyledInput
          id={id}
          className={isValid ? 'valid' : ''}
          variant={computedType()}
          type={computedType()}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          ref={ref}
          {...rest}
        />
        {type === 'email' && (
          <>
            <AtSignIcon />
            <Tick />
          </>
        )}

        {type === 'password' && (
          <button
            aria-label="Reveal Password"
            className={showPassword ? 'clicked' : ''}
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
          >
            <EyeIcon />
          </button>
        )}
</Box>
      </StyledInputWrapper>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
