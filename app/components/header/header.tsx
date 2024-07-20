import { ILangPageProps } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.scss";
import TheLanguage from "./language";
import TheNavigation from "./navigation";

const TheHeader: React.FC<ILangPageProps> = async ({ lng }) => {
  return (
    <header>
      <div  className={`${styles.wrapper} container`}>
        <div>
          <Link href={`/${lng}`}>
            <Image
              src="/logo-1.png"
              alt="логотип Translate Agency"
              // className="logo-header"
              width={200}
              height={100}
            />
          </Link>
        </div>
        <TheNavigation lng={lng} />
        <TheLanguage lng={lng} />
      </div>
    </header>
  );
};

export { TheHeader };
