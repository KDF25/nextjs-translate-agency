"use client";

import { languageEnum, languages } from "@/app/i18n/settings";
import { ILangPageProps } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "../styles/Header.module.scss";

const TheLanguage: React.FC<ILangPageProps> = ({ lng }) => {
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const segments = pathname.split("/");
  const path =
    segments.length > 2 ? `/${segments[segments.length - 1]}` : false;
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu();
    }
  };

  const handleButtonClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.language}>
      {screen >= 992 ? (
        <div className={styles.column}>
          {languages.map((lang, index) => (
            <Link
              key={index}
              href={path ? `/${lang + path}` : `/${lang}`}
              className={`${styles.lang}  ${lang === lng ? styles.active : ""}`}
            >
              <p>{lang.toLocaleUpperCase()}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div
          className={`${styles.row} ${isMenuOpen && styles.active}`}
          ref={menuRef}
        >
          <div
            className={`${styles.lang} ${styles.active}`}
            onClick={handleButtonClick}
          >
            <p>{lng.toLocaleUpperCase()}</p>
            <IoIosArrowDown />
          </div>

          {isMenuOpen && (
            <ul className={styles.menu}>
              {languages.map((lang, index) => (
                <Link
                  key={index}
                  className={styles.menu__item}
                  href={path ? `/${lang + path}` : `/${lang}`}
                >
                  <p>{lang.toLocaleUpperCase()}</p>
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TheLanguage;
