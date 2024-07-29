"use client";

import { useTranslation } from "@/app/i18n/client";
import { ILangPageProps, IMailData } from "@/types/user";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/FifthHome.module.scss";
import { BasketIcon, FileIcon, FolderIcon, YesIcon } from "../icons";
import { scrollEnum } from "@/types/constansts";
import { FILES } from "@/config";

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
  const { register, watch, setValue } = useForm<IMailData>({
    mode: "onChange",
  });
  const { t } = useTranslation(lng);

  const formState = watch();
  const files = formState?.file || [];
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newFiles: File[] = [...e.target.files];
      const newAllFiles = [...files, ...newFiles];
      setValue("file", newAllFiles.slice(0, FILES.maxLenght));
    }
  };

  const handleReset = () => {
    setValue("file", []);
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
      const newFiles: File[] = [...e.dataTransfer.files];
      if (files.length + newFiles.length <= 10) {
        setValue("file", [...files, ...newFiles]);
      }
    }
  };

  const handleRemoveFile = (
    file: File,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    console.log("file", file);
    event.stopPropagation();
    event.preventDefault();
    const newFiles = files?.filter((item) => item !== file);
    setValue("file", newFiles);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div id={scrollEnum.form} className={`${styles.wrapper} container`}>
      <h2 className={styles.title}>{t("HomePage.FifthHome.title")}</h2>
      <div>
        <form
          action=""
          className={styles.form__wrapper}
          onSubmit={handleSubmit}
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
                {files.length !== 0 && (
                  <div className={styles.items}>
                    {files.map((file, id) => (
                      <div key={id} className={styles.item}>
                        <div className={styles.item__left}>
                          <FileIcon />
                          <div className={styles.item__text}>
                            <p>{file?.name}</p>
                            <span>{formatFileSize(file?.size)}</span>
                          </div>
                        </div>
                        <div className={styles.item__right}>
                          <YesIcon />
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={(event) => handleRemoveFile(file, event)}
                          >
                            <BasketIcon />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {files.length < FILES.maxLenght && (
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
      </div>
    </div>
  );
};

export default FifthHome;
