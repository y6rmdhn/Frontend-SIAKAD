// login
export interface ILogin {
  nip: string;
  password: string;
  captcha_id: string;
  slider_position: number;
}

export interface ILogout {
  accessToken: string;
}
