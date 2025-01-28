export interface VoteData {
  [key: string]: string;
}

export interface User {
  id: string;
  username: string;
  password: string; // Senha criptografada
}
