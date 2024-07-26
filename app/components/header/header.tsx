import { ILangPageProps } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.scss";
import TheLanguage from "./language";
import TheNavigation from "./navigation";
import logo from "./../icons/logo.png";
import Burger from "./burger/burger";

const TheHeader: React.FC<ILangPageProps> = async ({ lng }) => {
  return (
    <header>
      <div className={`${styles.wrapper} container`}>
        <div>
          <Link href={`/${lng}`}>
            <Image
              src={logo}
              alt="логотип Translate Agency"
              width={125}
              height={30}
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
