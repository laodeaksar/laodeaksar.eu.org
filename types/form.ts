export enum Form {
  Initial,
  Loading,
  Success,
  Error
}

export interface FormState {
  state: Form;
  message?: string;
}
