export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  toggled?: boolean;
  label?: React.ReactNode;
  id: string;
  ['aria-label']: string;
}
