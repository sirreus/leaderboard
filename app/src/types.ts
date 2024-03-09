export interface IUserData {
  avatar: string;
  email: string;
  score: number;
  userId: string;
  username: string;
}

export interface ILeaderBoard {
  data: IUserData[] | [];
}

export interface IUserDataRow {
  data: IUserData;
}

export interface ISettings {
  mark: number;
  handleChange: (_: Event, newValue: number | number[]) => void;
}
