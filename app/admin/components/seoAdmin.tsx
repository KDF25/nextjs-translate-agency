"use client";

import { languageEnum } from "@/app/i18n/settings";
import { putPageSeo } from "@/services/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../styles/AuthAdmin.module.scss";
import { IUserData } from "@/types/user";

interface SeoAdminProps {
  seo: IUserData;
  lng: languageEnum;
  seoId: number;
}

export default function SeoAdmin({ seo, lng, seoId }: SeoAdminProps) {
  const [isChange, setIsChange] = useState(false);
  const [title, setTitle] = useState<string | null>(seo?.seo_title || null);
  const [description, setDescription] = useState<string | null>(
    seo?.seo_description || null
  );
  const [keywords, setKeywords] = useState<string | null>(
    seo?.seo_keywords || null
  );

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleChangeKeywords = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(event.target.value);
  };
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    putPageSeo(seoId, title!, description!, keywords!);
    setIsChange(false);
    setTitle(null);
    setDescription(null);
    setKeywords(null);
    router.push("/admin");
  };

  return (
    <div>
      {isChange ? (
        <div className={styles.admin__wrapper__change}>
          <form onSubmit={handleSubmit} className={styles.admin__wrapper}>
            <label>
              <span>Title {lng}: </span>
              <input
                type="text"
                value={title || ""}
                onChange={handleChangeTitle}
              />
            </label>
            <label>
              <span>Description {lng}: </span>
              <input
                type="text"
                value={description || ""}
                onChange={handleChangeDescription}
              />
            </label>
            <label>
              <span>Keywords {lng}: </span>
              <input
                type="text"
                value={keywords || ""}
                onChange={handleChangeKeywords}
              />
            </label>
            <input
              className={styles.changeBtn}
              type="submit"
              value="Отправить"
              disabled={
                !title || !description || (!keywords && true) // disabled attribute expects a boolean
              }
            />
          </form>
          <button className={styles.backBtn} onClick={() => setIsChange(false)}>
            Назад
          </button>
        </div>
      ) : (
        <div className={styles.seo__wrapper}>
          <div className={styles.texts}>
            <div className={styles.text}>
              <p>Title: </p> <span>{seo?.seo_title}</span>
            </div>
            <div className={styles.text}>
              <p>Description: </p>
              <span>{seo?.seo_description}</span>
            </div>
            <div className={styles.text}>
              <p>Keywords: </p>
              <span>{seo?.seo_keywords}</span>
            </div>
          </div>
          <div>
            <button
              className={styles.changeBtn}
              onClick={() => setIsChange(true)}
            >
              Изменить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
