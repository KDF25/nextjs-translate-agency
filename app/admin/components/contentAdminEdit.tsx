"use client";

import { languageEnum } from "@/app/i18n/settings";
import {
  getRevalidate,
  putContentAlt,
  putContentFile,
  putContentText,
} from "@/services/admin";
import { IBlock } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/AuthAdmin.module.scss";

interface ContentAdminEditProps {
  block: IBlock;
  pageId: number;
  lng: languageEnum;
}
const ContentAdminEdit: React.FC<ContentAdminEditProps> = ({
  block,
  lng,
  pageId,
}) => {
  const [isChange, setIsChange] = useState(false);
  const [fileStates, setFileStates] = useState<{
    fileId: number;
    formData: FormData;
  } | null>(null);

  const [altStates, setAltStates] = useState<{ id: number; text: string }[]>(
    []
  );

  const [textStates, setTextStates] = useState<{ id: number; text: string }[]>(
    []
  );

  const router = useRouter();

  const handleChangeFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const formData = new FormData();
    formData.append("file", event.target.files![0]);
    setFileStates({ fileId: id, formData: formData });
  };

  const handleChangeText = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newText = event.target.value;
    const newTextStates = textStates.map((item) => {
      if (item?.id === index) {
        return { ...item, text: newText };
      }
      return item;
    });
    setTextStates(newTextStates);
  };

  const handleChangeAlt = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAlt = event.target.value;
    const newAltStates = altStates.map((item) => {
      if (item?.id === index) {
        return { ...item, text: newAlt };
      }
      return item;
    });
    setAltStates(newAltStates);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fileStates) {
      putContentFile(fileStates.fileId, fileStates.formData);
    }
    if (block?.texts[0]?.text) {
      const texts = block?.texts.map((item) => ({
        id: item?.id,
        text: item.text,
      }));
      const alts = block?.files[0]?.alts.map((item) => ({
        id: item?.id,
        text: item.text,
      }));

      const areTextsEqual =
        JSON.stringify(texts) === JSON.stringify(textStates);
      const areAltsEqual = JSON.stringify(alts) === JSON.stringify(altStates);
      if (!areTextsEqual) {
        putContentText(textStates);
      }
      if (!areAltsEqual) {
        putContentAlt(altStates);
      }
    }
    getRevalidate("/ru");
    getRevalidate("/en");
    getRevalidate("/uz");
    router.push("/admin");
  };

  useEffect(() => {
    if (block?.texts[0]?.text) {
      const texts = block?.texts.map((item) => ({
        id: item?.id,
        text: item.text,
      }));
      setTextStates(texts);
    }
    if (block?.files[0]?.id) {
      const initialAltStates = block.files.map((file) => ({
        id: file.alts[0]?.id,
        text: file.alts[0]?.text,
      }));
      setAltStates(initialAltStates);
    }
  }, [block]);
  return (
    <div>
      {isChange ? (
        <div className={styles.admin__wrapper__change}>
          <form className={styles.admin__wrapper} onSubmit={handleSubmit}>
            {block?.files[0]?.id &&
              block?.files.map((file, index) => (
                <div
                  key={file?.id}
                  style={{
                    display: "grid",
                    gridTemplate: "1fr 1fr / 1fr",
                    rowGap: "20px",
                  }}
                >
                  <label>
                    <span>Edit file:</span>
                    <input
                      type="file"
                      onChange={(event) => handleChangeFile(event, file?.id)}
                    />
                  </label>
                  <label>
                    <span>Edit alt for image:</span>
                    <input
                      type="text"
                      value={altStates[index]?.text || ""}
                      onChange={(event) =>
                        handleChangeAlt(altStates[index]?.id, event)
                      }
                    />
                  </label>
                </div>
              ))}
            {block?.texts[0]?.text &&
              block?.texts.map((text, index) => (
                <label key={index}>
                  <span>Edit text: {index + 1}</span>
                  <input
                    type="text"
                    value={textStates[index]?.text || ""}
                    onChange={(event) =>
                      handleChangeText(textStates[index]?.id, event)
                    }
                  />
                </label>
              ))}
            <input
              className={styles.changeBtn}
              type="submit"
              value="Сохранить изменения"
            />
          </form>
          <button className={styles.backBtn} onClick={() => setIsChange(false)}>
            Назад
          </button>
        </div>
      ) : (
        <div>
          <button
            className={styles.changeBtn}
            onClick={() => {
              setIsChange(true);
            }}
          >
            Изменить
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentAdminEdit;
