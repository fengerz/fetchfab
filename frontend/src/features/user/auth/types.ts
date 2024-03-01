export type LoginInputs = {
  email: string;
  password: string;
  remember: boolean;
};

export type RegisterInputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  terms: boolean;
};
