"use client";

import { Auth } from "@/services/admin";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../context";
import styles from "../styles/AuthAdmin.module.scss";

export default function AuthAdmin() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isAuth, handleIsAuth } = useContext(AuthContext);

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await Auth(login, password).then(() => {
      if (localStorage.getItem("isAuth")) {
        handleIsAuth(true);
      }
    });
  };

  return (
    <div className="container">
      {!isAuth ? (
        <div className={styles.form_wrapper}>
          <h1>Admin panel</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Login:
              <input
                type="text"
                value={login}
                onChange={handleChangeLogin}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={handleChangePassword}
              />
            </label>
            <input type="submit" value="Войти" className={styles.form_submit} />
          </form>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <Link href="/adminvenkon/adminhome" className={styles.my__link}>
            Home page
          </Link>
        </div>
      )}
    </div>
  );
}
