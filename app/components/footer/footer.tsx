import { ILangPageProps } from "@/types/user";
import Image from "next/image";
import React from "react";
import styles from "../styles/Footer.module.scss";
import logo from "./../icons/logo.svg";
import TheContacts from "./contacts";
import TheNavigation from "./navigation";

const TheFooter: React.FC<ILangPageProps> = ({ lng }) => {
  return (
    <footer>
      <div  className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <Image
              src={logo}
              alt="логотип Translate Agency"
              width={200}
              height={100}
            />
          </div>
          <TheNavigation lng={lng} />
        </div>
        <div className={styles.bottom}>
          <TheContacts lng={lng} />
          <p className={styles.reserved}>Cubeinc, 2024. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export { TheFooter };

