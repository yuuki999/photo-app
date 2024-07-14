export type AuthToken = {
  token: {
    access_token: string;
    access_token_v2: string;
    refresh_token: string;
  };
}

export type AuthTokenData = {
  access_token: string;
  access_token_v2: string;
  refresh_token: string;
}
