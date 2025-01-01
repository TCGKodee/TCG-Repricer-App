export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthError {
  code?: string;
  message: string;
}