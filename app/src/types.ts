export interface IUserData {
  avatar: string;
  email: string;
  score: number;
  userId: string;
  username: string;
}

export interface IAppStore {
  users: IUserData[];
  tableSize: number;
  lastAddedId?: string;
}
