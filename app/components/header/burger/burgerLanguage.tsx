"use client";

import { ILangPageProps } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { languages } from "../../../i18n/settings";
import styles from "./../../styles/Header.module.scss";

const BurgerLanguage: React.FC<ILangPageProps> = ({ lng }) => {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const path =
    segments.length > 2 ? `/${segments[segments.length - 1]}` : false;

  return (
    <div className={styles.language}>
      <div className={`${styles.column} ${styles.burgers}`}>
        {languages.map((lang) => (
          <Link
            key={lang}
            href={path ? `/${lang + path}` : `/${lang}`}
            className={`${styles.lang}  ${
              lang === lng ? styles.active : styles.burger
            }`}
          >
            <p>{lang.toUpperCase()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BurgerLanguage;
