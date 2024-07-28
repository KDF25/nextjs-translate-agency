import { createContext } from "react";

// Определение типа для контекста аутентификации
export type AuthContextType = {
  isAuth: boolean;
  handleIsAuth: (bool: boolean) => void;
};

// Создание контекста аутентификации
export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  handleIsAuth: () => {},
});
