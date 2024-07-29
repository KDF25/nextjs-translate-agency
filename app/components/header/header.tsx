import { ILangPageProps } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.scss";
import TheLanguage from "./language";
import TheNavigation from "./navigation";
import logo from "@/public/logo.png";
import Burger from "./burger/burger";

const TheHeader: React.FC<ILangPageProps> = async ({ lng }) => {
  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles.logo_image_wrapper}>
          <Link href={`/${lng}`}>
            <Image
              src={logo}
              alt="logo Vip-perevod"
              className={styles.logo_image}
              width={500}
              height={500}
            />
          </Link>
        </div>
        <TheNavigation lng={lng} />
        <Burger lng={lng} />
        <TheLanguage lng={lng} />
      </div>
    </header>
  );
};

export { TheHeader };
