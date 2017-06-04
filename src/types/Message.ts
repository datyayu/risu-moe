import { User } from "./User";

export type Message = {
  type_: "system" | "user";
  text: string;
  time: number;
  user: User;
};
