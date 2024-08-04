"use client";

import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect, useState } from "react";
import "../styles/global.scss";
import { AuthContext } from "./context";

export type AdminLayoutProps = {
  children: ReactNode; 
};

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedIsAuth = localStorage.getItem("isAuth");
    setIsAuth(!!storedIsAuth); // !! преобразует значение в boolean
  }, []);

  const handleIsAuth = (bool: boolean) => {
    setIsAuth(bool);
  };

  const closeAdmin = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    router.push("/uz");
  };

  return (
    <>
      <html>
        <body>
          <AuthContext.Provider value={{ isAuth, handleIsAuth }}>
            <main>
              <div>
                {isAuth && (
                  <div className="container">
                    <div className="admin__exit__wrapper">
                      <button className="exit" onClick={() => closeAdmin()}>
                        Выход
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {children}
            </main>
          </AuthContext.Provider>
        </body>
      </html>
    </>
  );
};

export default AdminLayout;
