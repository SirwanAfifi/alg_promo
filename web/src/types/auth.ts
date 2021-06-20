export interface Auth {
  token: string | null;
  userInfo: {
    balance: number;
    username: string;
  };
}
