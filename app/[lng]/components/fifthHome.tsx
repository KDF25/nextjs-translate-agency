"use client";

import { useTranslation } from "@/app/i18n/client";
import { sendMail, sendMailFile } from "@/services/user";
import { MAIN_PAGE_ANIMATION } from "@/types/animation";
import { scrollEnum } from "@/types/constansts";
import { ILangPageProps, IMailData } from "@/types/user";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BasketIcon, FileIcon, FolderIcon, YesIcon } from "../icons";
import styles from "../styles/FifthHome.module.scss";

const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes >= 1024 * 1024) {
    return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
  } else if (sizeInBytes >= 1024) {
    return (sizeInBytes / 1024).toFixed(2) + " KB";
  } else {
    return sizeInBytes + " bytes";
  }
};

const FifthHome: React.FC<ILangPageProps> = ({ lng }) => {
  const { register, watch, setValue, handleSubmit, reset } = useForm<IMailData>(
    {
      mode: "onChange",
    }
  );
  const { t } = useTranslation(lng);

  const formState = watch();
  const files = formState?.file;
  const [dragActive, setDragActive] = useState(false);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", e.target.files![0]);
      setValue("file", formData);
      setFileInfo({ name: file.name, size: formatFileSize(file.size) });
    }
  };

  const handleReset = () => {
    setValue("file", null);
  };

  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(true);
  };

  const handleLive = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = function (e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const formData = new FormData();
      formData.append("file", e.dataTransfer.files![0]);
      setValue("file", formData);
      setFileInfo({ name: file.name, size: formatFileSize(file.size) });
    }
  };

  const handleRemoveFile = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    handleReset();
  };

  const onSubmit = async (data: IMailData) => {
    if (data?.file) {
      await sendMailFile(data.name, data.phoneNumber, data.email, data.file);
    } else {
      await sendMail(data.name, data.phoneNumber, data.email);
    }
    alert(t("HomePage.FifthHome.alert"));
    reset(); // Сброс формы после успешной отправки
  };

  let custom = 0;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={MAIN_PAGE_ANIMATION.viewport}
      id={scrollEnum.form}
      className={`${styles.wrapper} container`}
    >
      <motion.h2
        custom={custom++}
        variants={MAIN_PAGE_ANIMATION.animationVision}
        className={styles.title}
      >
        {t("HomePage.FifthHome.title")}
      </motion.h2>
      <motion.div custom={custom++} variants={MAIN_PAGE_ANIMATION.animationUp}>
        <form
          action=""
          className={styles.form__wrapper}
          onSubmit={handleSubmit(onSubmit)}
        >
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
              inputMode="numeric"
              pattern="\+998\d{9}"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/[^\d+]/g, "");
              }}
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
            <div
              className={`${styles.add_files_wrapper} ${
                dragActive ? styles.drag : ""
              }`}
              onReset={handleReset}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleLive}
              onDrop={handleDrop}
            >
              <div className={styles.files__wrapper}>
                {files ? (
                  <div className={styles.items}>
                    <div className={styles.item}>
                      <div className={styles.item__left}>
                        <FileIcon />
                        <div className={styles.item__text}>
                          <p>{fileInfo?.name}</p>
                          <span>
                            {formatFileSize(parseFloat(fileInfo?.size!))}
                          </span>
                        </div>
                      </div>
                      <div className={styles.item__right}>
                        <div style={{ padding: "5px" }}>
                          <YesIcon />
                        </div>
                        <div
                          style={{ cursor: "pointer", padding: "5px 10px" }}
                          onClick={(event) => handleRemoveFile(event)}
                        >
                          <BasketIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
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
                      onChange={handleChange}
                      accept=".jpeg, .jpg, .png, .gif, .mp4, .pdf, .psd, .ai, .doc, .docx, .ppt, .pptx"
                    />
                  </>
                )}
              </div>
            </div>
          </label>
          <button type="submit" className={styles.send}>
            {t("HomePage.FifthHome.sendButton")}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default FifthHome;
