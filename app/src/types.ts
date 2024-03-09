export interface IUserData {
  username: string;
  email: string;
  score: number;
}

export interface IUserDataRow {
  data: IUserData;
}

export interface ISettings {
  mark: number;
  handleChange: (_: Event, newValue: number | number[]) => void;
}
