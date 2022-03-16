export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'label' | 'as' | 'type'
  > {
  label?: React.ReactNode;
  id: string;
  ['aria-label']: string;
}
