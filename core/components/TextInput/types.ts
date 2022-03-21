import type { CSS } from "~/lib/stitches.config";

export type TextInputTypes = 'email' | 'password' | 'search' | 'text' | 'url';

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: TextInputTypes;
  label?: React.ReactNode;
  value?: string;
  id: string;
  ['aria-label']: string;
  css?:CSS
  onChange?: React.FormEventHandler<HTMLInputElement>;
}
