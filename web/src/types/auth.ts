export interface Auth {
  token: string | null;
  userInfo: {
    userId: number;
    balance: number;
    username: string;
  };
}
