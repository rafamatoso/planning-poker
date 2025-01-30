export interface IVote {
  [key: string]: { username: string; vote: string };
}

export interface User {
  id: string;
  username: string;
  password: string; // Senha criptografada
}
