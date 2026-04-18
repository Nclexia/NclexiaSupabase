export type UUID = string & { readonly brand: unique symbol };

export type GetUsers = {
  id: UUID;
  email: string;
  name: string;
  created_at: string;
  active: boolean;
  last_login: string;
  role: string;
  provider: string;
};
