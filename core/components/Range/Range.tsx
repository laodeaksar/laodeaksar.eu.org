import { useEffect, useMemo, useState } from 'react';
import useDebounce from '~/hooks/useDebouncedValue';

import Label from '~/components/Label';

import { StyledRange } from './Styles';
import { RangeProps } from './types';
import { adjustSlider } from './utils';

const Range = (props: RangeProps) => {
  const {
    debounce = 0,
    step,
    id,
    disabled,
    max,
    min,
    onChange,
    value,
    label,
    ...rest
  } = props;
  const [range, setRange] = useState(value);
  const debouncedValue = useDebounce(range, debounce);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  const fill = useMemo(
    () => adjustSlider(value, min, max, disabled),
    [value, min, max, disabled]
  );

  return (
    <div style={{ width: '100%', margin: '8px 0px' }}>
      {label && (
        <Label htmlFor={id} style={{ marginBottom: '12px' }}>
          {label}
        </Label>
      )}
      <StyledRange
        id={id}
        type="range"
        onChange={(e) => setRange(parseFloat(e.target.value))}
        css={{'$$track': fill}}
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

export default Range;
