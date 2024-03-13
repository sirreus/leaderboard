export interface IUserData {
  avatar: string;
  email: string;
  score: number;
  userId: string;
  username: string;
}

export interface ILeaderBoard {
  data: IUserData[] | [];
  handelDeleteUser: (id: string) => void;
}

export interface IUserDataRow {
  data: IUserData;
  handelDelete: (id: string) => void;
}

export interface ISettings {
  mark: number;
  handleChange: (_: Event, newValue: number | number[]) => void;
}
