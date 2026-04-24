// login
export interface ILogin {
  username: string;
  password: string;
  // captcha_id: string;
  // slider_position: number;
}

export interface ILogout {
  refresh_token: string;
  accessToken: string;
  userId: string;
  active_mode: string;
}

export interface IRefresh {
  refresh_token: string;
}
