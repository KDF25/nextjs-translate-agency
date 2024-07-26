"use client";

import { languages } from "@/app/i18n/settings";
import { addAlt, addBlock, addFile, addText } from "@/services/admin";
import { IBlock, IText } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/AuthAdmin.module.scss";

interface Props {
  block: IBlock;
  sectionId: number;
  pageId: number;
}

interface IAlt {
  text: string;
  language: string;
}

const ContentAdminAdd: React.FC<Props> = ({ block, sectionId, pageId }) => {
  const [isAdd, setIsAdd] = useState(false);
  const [addedTextStates, setAddedTextStates] = useState<IText[]>([]);
  const [addedFile, setAddedFile] = useState<{ formData: FormData } | null>(
    null
  );
  const [addedAltStates, setAddedAltStates] = useState<IAlt[]>([]);
  const router = useRouter();

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("file", event.target.files![0]);
    setAddedFile({ formData });
  };

  const handleChangeAlt = (
    lang: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const text = event.target.value;
    const newAddData: IAlt[] = addedAltStates.map((item) => {
      if (item.language === lang) {
        return { ...item, text: text };
      }
      return item;
    });
    setAddedAltStates(newAddData);
  };

  const handleChangeText = (
    lang: string,
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const text = event.target.value;
    const newAddData: IText[] = addedTextStates.map((item) => {
      if (item.id === index && item.language === lang) {
        return { ...item, text: text };
      }
      return item;
    });
    setAddedTextStates(newAddData);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (block?.files[0]?.id && addedFile) {
      addBlock(sectionId).then((data: any) => {
        addFile(data.block_id, addedFile.formData).then((data: any) =>
          addAlt(data.file_id, addedAltStates)
        );
        if (block?.texts[0]?.id) {
          addText(data.block_id, addedTextStates);
        }
      });
      router.push("/adminvenkon");
    } else {
      addBlock(sectionId).then((data: { block_id: number }) => {
        addText(data.block_id, addedTextStates);
      });
      router.push("/adminvenkon");
    }
  };

  useEffect(() => {
    if (block?.files[0]?.id) {
      const firstTextData: IAlt[] = languages.map((language) => ({
        language,
        text: "",
      }));
      setAddedAltStates(firstTextData);
    }

    if (block?.texts[0]?.id) {
      const ids = Array.from({ length: block.texts.length }, (_, i) => i);
      const firstTextData: IText[] = ids.flatMap((id) =>
        languages.map((language) => ({ id, language, text: "" }))
      );
      setAddedTextStates(firstTextData);
    }
  }, [block]);

  return (
    <div>
      {isAdd ? (
        <div className={styles.admin__wrapper__change}>
          <form onSubmit={handleSubmit} className={styles.admin__wrapper}>
            {block?.files[0]?.id &&
              block?.files.map((file: any, index: number) => (
                <div className={styles.admin__wrapper} key={file.id}>
                  <label>
                    <span>Add file:</span>
                    <input
                      type="file"
                      onChange={(event) => handleChangeFile(event)}
                    />
                  </label>
                  {languages.map((lang) => (
                    <label key={lang}>
                      <span>Add alt for image {lang}:</span>
                      <input
                        type="text"
                        value={
                          addedTextStates.find(
                            (item) =>
                              item.id === index && item.language === lang
                          )?.text || ""
                        }
                        onChange={(event) => handleChangeAlt(lang, event)}
                      />
                    </label>
                  ))}
                </div>
              ))}
            {block?.texts[0]?.id &&
              block?.texts.map((text: any, index: number) => (
                <div key={text.id} className={styles.admin__wrapper}>
                  {languages.map((lang) => (
                    <label key={lang}>
                      <span>
                        Add text #{index + 1} {lang}:
                      </span>
                      <input
                        type="text"
                        value={
                          addedTextStates.find(
                            (item) =>
                              item.id === index && item.language === lang
                          )?.text || ""
                        }
                        onChange={(event) =>
                          handleChangeText(lang, index, event)
                        }
                      />
                    </label>
                  ))}
                </div>
              ))}
            <input
              type="submit"
              value="Добавить блок"
              className={styles.changeBtn}
              disabled={
                (block?.files[0]?.id && addedFile === null) ||
                (block?.files[0]?.id &&
                  addedAltStates.some((item) => item.text === "")) ||
                (block?.texts[0]?.id &&
                  addedTextStates.some((item) => item.text === "")) ||
                false
              }
            />
          </form>
          <button className={styles.backBtn} onClick={() => setIsAdd(false)}>
            Назад
          </button>
        </div>
      ) : (
        <div>
          <button className={styles.changeBtn} onClick={() => setIsAdd(true)}>
            Добавить блок
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentAdminAdd;
