import { ILangPageProps } from "@/types/user";
import styles from "../styles/Footer.module.scss";
import React from "react";
import TheNavigation from "./navigation";
import TheContacts from "./contacts";
import Image from "next/image";

const TheFooter: React.FC<ILangPageProps> = ({ lng }) => {
  return (
    <footer>
      <div  className={`${styles.wrapper} container`}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <Image
              src="/logo.svg"
              alt="логотип Translate Agency"
              // className="logo-header"
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
