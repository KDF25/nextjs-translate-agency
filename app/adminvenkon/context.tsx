import { createContext, ReactNode } from "react";

// Определение типа для пропсов компонента AdminLayout
export type AdminLayoutProps = {
  children: ReactNode; // children должны быть типом ReactNode
};

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
