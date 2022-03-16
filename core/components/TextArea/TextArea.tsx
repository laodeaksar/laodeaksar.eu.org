import { forwardRef } from 'react';

import Label from '~/components/Label';

import { StyledTextArea } from './Styles';
import type { TextAreaProps } from '.';

const TextArea = forwardRef(
  (props: TextAreaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    const {
      id,
      disabled,
      label,
      placeholder,
      value,
      resize,
      rows = 10,
      ...rest
    } = props;
    return (
      <div>
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
        <StyledTextArea
          id={id}
          disabled={disabled}
          // label={label}
          placeholder={placeholder}
          value={value}
          resize={resize}
          rows={rows}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
