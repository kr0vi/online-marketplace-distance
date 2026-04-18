export type MeUser = {
  name: string;
  email: string;
  role?: string;
};

export type MeGetResponse = {
  success: boolean;
  user?: MeUser;
  message?: string;
};

export type MeUpdateResponse = {
  success: boolean;
  message: string;
};
