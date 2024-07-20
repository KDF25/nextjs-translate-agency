"use client";

import { languageEnum, languages } from "@/app/i18n/settings";
import {
  addAlt,
  addBlock,
  addFile,
  addText,
  getRevalidate,
} from "@/services/admin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  block: any; // Replace with actual type
  sectionId: number; // Replace with actual type
  pageId: number; // Replace with actual type
}

const ContentAdminAdd: React.FC<Props> = ({ block, sectionId, pageId }) => {
  const [isAdd, setIsAdd] = useState(false);
  const [addedTextStates, setAddedTextStates] = useState<any[]>([]);
  const [addedFile, setAddedFile] = useState<{ formData: FormData } | null>(
    null
  );
  const [addedAltStates, setAddedAltStates] = useState<any[]>([]);
  const router = useRouter();

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("file", event.target.files![0]);
    setAddedFile({ formData });
  };

  const handleChangeAlt = (
    lang: string,
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedText = event.target.value;
    setAddedAltStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = {
        ...updatedStates[index],
        [lang]: {
          ...updatedStates[index][lang],
          text: updatedText,
        },
      };
      return updatedStates;
    });
  };

  const handleChangeText = (
    lang: string,
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedText = event.target.value;
    setAddedTextStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = {
        ...updatedStates[index],
        [lang]: {
          ...updatedStates[index][lang],
          text: updatedText,
        },
      };
      return updatedStates;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (block?.files[0]?.id && addedFile) {
      addBlock(sectionId).then((data: any) => {
        addFile(data.block_id, addedFile.formData).then((data: any) =>
          addAlt(
            data.file_id,
            addedAltStates[0]?.ru?.text,
            addedAltStates[0]?.uz?.text,
            addedAltStates[0]?.en?.text
          )
        );
        if (block?.texts[0]?.id) {
          addedTextStates.map((texts) => {
            addText(
              data.block_id,
              texts?.ru?.text,
              texts?.uz?.text,
              texts?.en?.text
            );
          });
        }
      });
      getRevalidate(pageId == 2 ? "/ru" : "/ru/whyvenkoncommunications");
      getRevalidate(pageId == 2 ? "/en" : "/en/whyvenkoncommunications");
      getRevalidate(pageId == 2 ? "/uz" : "/uz/whyvenkoncommunications");

      router.push("/adminvenkon");
    } else {
      addBlock(sectionId).then((data: any) => {
        addedTextStates.map((texts) => {
          addText(
            data.block_id,
            texts?.ru?.text,
            texts?.uz?.text,
            texts?.en?.text
          );
        });
      });
      // invalidateCache();
      router.push("/adminvenkon");
    }
  };

  useEffect(() => {
    if (block?.files[0]?.id) {
      const altBlock = block?.files[0]?.alts.reduce((acc: any[], obj: any) => {
        const alts = languages.reduce((langAcc, lang) => {
          langAcc[lang] = { text: "" };
          return langAcc;
        }, {} as { [key in languageEnum]: { text: string } });
        acc.push(alts);
        return acc;
      }, []);
      setAddedAltStates(altBlock);
    }

    if (block?.texts[0]?.id) {
      const textsBlock = block?.texts.reduce((acc: any[], obj: any) => {
        const texts = languages.reduce((langAcc, lang) => {
          langAcc[lang] = { text: "" };
          return langAcc;
        }, {} as { [key in languageEnum]: { text: string } });
        acc.push(texts);
        return acc;
      }, []);
      setAddedTextStates(textsBlock);
    }
  }, [block?.files, block?.texts]);

  return (
    <div>
      {isAdd ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "3%",
              border: "0.5px solid #999999",
              borderRadius: "10px",
              margin: "10px",
            }}
          >
            {block?.files[0]?.id &&
              block?.files.map((file: any, index: number) => (
                <div key={file.id}>
                  <label
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontWeight: "500", marginBottom: "10px" }}>
                      Add file:
                    </span>
                    <input
                      type="file"
                      style={{
                        padding: "10px",
                        borderRadius: "15px",
                        border: "0.5px solid #606060",
                      }}
                      onChange={(event) => handleChangeFile(event)}
                    />
                  </label>
                  {languages.map((lang) => (
                    <label
                      key={lang}
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontWeight: "500", marginBottom: "5px" }}>
                        Add alt for image {lang}:
                      </span>
                      <input
                        type="text"
                        style={{
                          padding: "10px",
                          borderRadius: "15px",
                          border: "0.5px solid #606060",
                        }}
                        value={addedAltStates[index]?.[lang]?.text}
                        onChange={(event) =>
                          handleChangeAlt(lang, index, event)
                        }
                      />
                    </label>
                  ))}
                </div>
              ))}
            {block?.texts[0]?.id &&
              block?.texts.map((text: any, index: number) => (
                <div key={text.id}>
                  {languages.map((lang) => (
                    <label
                      key={lang}
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontWeight: "500", marginBottom: "5px" }}>
                        Add text #{index + 1} {lang}:
                      </span>
                      <input
                        type="text"
                        style={{
                          padding: "10px",
                          borderRadius: "15px",
                          border: "0.5px solid #606060",
                        }}
                        value={addedTextStates[index][lang]?.text}
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
              disabled={
                (block?.files[0]?.id && addedFile === null) ||
                (block?.files[0]?.id &&
                  languages.some((lang) =>
                    [0, 1].some(
                      (idx) => addedAltStates?.[idx]?.[lang]?.text.length === 0
                    )
                  )) ||
                (block?.texts[0]?.id &&
                  languages.some((lang) =>
                    [0, 1].some(
                      (idx) => addedTextStates?.[idx]?.[lang]?.text.length === 0
                    )
                  ))
              }
            />
          </form>
          <button onClick={() => setIsAdd(false)}>Назад</button>
        </div>
      ) : (
        <div>
          <button style={{ color: "green" }} onClick={() => setIsAdd(true)}>
            Добавить блок
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentAdminAdd;
