"use client";

import { useTranslation } from "@/app/i18n/client";
import { ILangPageProps, IMailData } from "@/types/user";
import React from "react";
import { useForm } from "react-hook-form";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FolderIcon } from "../icons/folder";
import styles from "../styles/FifthHome.module.scss";

const FifthHome: React.FC<ILangPageProps> = ({ lng }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IMailData>({
    mode: "onChange",
  });
  const { t } = useTranslation(lng);

  return (
    <section className={`${styles.wrapper} container`}>
      <h2 className={styles.title}>{t("HomePage.FifthHome.title")}</h2>
      <div>
        <form action="" className={styles.form__wrapper}>
          <label className={styles.form__title}>
            <span className={styles.text}>{t("HomePage.FifthHome.name")}</span>
            <input
              className={styles.form__input}
              placeholder="Gomer"
              {...register("name", {
                required: true,
                minLength: 1,
              })}
            />
          </label>
          <label className={styles.form__title}>
            <span className={styles.text}>{t("HomePage.FifthHome.email")}</span>
            <input
              className={styles.form__input}
              placeholder="name@domain.com"
              {...register("email", {
                required: true,
                minLength: 1,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
          </label>
          <label className={styles.form__title}>
            <span className={styles.text}>
              {t("HomePage.FifthHome.phoneNumber")}
            </span>
            <input
              className={styles.form__input}
              defaultValue="+998"
              type="tel"
              maxLength={13}
              {...register("phoneNumber", {
                required: true,
                minLength: 1,
                maxLength: 13,
                pattern: /^\+998\d{9}$/,
              })}
            />
          </label>
          <label className={styles.form__title}>
            <span className={styles.text}>
              {t("HomePage.FifthHome.files.file")}
            </span>
            <div className={styles.files__wrapper}>
              <FolderIcon />
              <div className={styles.files__wrapper__input}>
                <div className={styles.files__wrapper__text}>
                  <div className={styles.share}>
                    <p>{t("HomePage.FifthHome.files.drag")}</p>
                    <p className={styles.press}>
                      {t("HomePage.FifthHome.files.add")}
                    </p>
                  </div>
                  <span>{t("HomePage.FifthHome.files.formats")}</span>
                </div>
              </div>
              <input
                type="file"
                className={styles.files}
                multiple={true}
                accept=".jpeg, .jpg, .png, .gif, .mp4, .pdf, .psd, .ai, .doc, .docx, .ppt, .pptx"
              />
            </div>
          </label>
          <button className={styles.send}>
            {t("HomePage.FifthHome.sendButton")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FifthHome;
