"use client";

import { languageEnum } from "@/app/i18n/settings";
import {
  getRevalidate,
  putContentAlt,
  putContentFile,
  putContentText,
} from "@/services/admin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ContentAdminEditProps {
  block: {
    texts: { id: number; text: string }[];
    files: { id: number; alts: { id: number; text: string }[] }[];
  };
  pageId: number;
  lng: languageEnum;
}
const ContentAdminEdit: React.FC<ContentAdminEditProps> = ({ block, lng, pageId }) => {
  const [isChange, setIsChange] = useState(false);
  const [fileStates, setFileStates] = useState<{
    fileId: number;
    formData: FormData;
  } | null>(null);
  const [altStates, setAltStates] = useState<
    { fileId: number; altId: number; text: string }[]
  >([]);
  const [textStates, setTextStates] = useState<{ id: number; text: string }[]>(
    []
  );
  const router = useRouter();

  const updateTextStateById = (id: number, newText: string) => {
    setTextStates((prevTextStates) =>
      prevTextStates.map((textState) =>
        textState.id === id ? { ...textState, text: newText } : textState
      )
    );
  };

  const updateAltStateById = (id: number, newAlt: string) => {
    setAltStates((prevAltStates) =>
      prevAltStates.map((altState) =>
        altState.altId === id ? { ...altState, text: newAlt } : altState
      )
    );
  };

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
    const id = textStates[index].id;
    updateTextStateById(id, newText);
  };

  const handleChangeAlt = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAlt = event.target.value;
    const id = block.files[index].alts[0].id;
    updateAltStateById(id, newAlt);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fileStates) {
      putContentFile(fileStates.fileId, fileStates.formData);
      putContentAlt(altStates[0].fileId, altStates[0].text, lng);
    }
    if (block.texts[0]?.id) {
      textStates.forEach((text) => {
        putContentText(text.id, text.text);
      });
    }
    getRevalidate(pageId === 2 ? "/ru" : "/ru/whyvenkoncommunications");
    getRevalidate(pageId === 2 ? "/en" : "/en/whyvenkoncommunications");
    getRevalidate(pageId === 2 ? "/uz" : "/uz/whyvenkoncommunications");
    router.push("/adminvenkon");
  };

  useEffect(() => {
    if (block?.texts[0]?.id) {
      const initialTextStates = block.texts.map((text) => ({
        id: text.id,
        text: text.text,
      }));
      setTextStates(initialTextStates);
    }
    if (block?.files[0]?.id) {
      const initialAltStates = block.files.map((file) => ({
        fileId: file.id,
        altId: file.alts[0].id,
        text: file.alts[0].text,
      }));
      setAltStates(initialAltStates);
    }
  }, [block]);

  return (
    <div>
      {isChange ? (
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
              block?.files.map((file, index) => (
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
                      Edit file:
                    </span>
                    <input
                      type="file"
                      onChange={(event) => handleChangeFile(event, file.id)}
                      style={{
                        padding: "10px",
                        borderRadius: "15px",
                        border: "0.5px solid #606060",
                      }}
                    />
                  </label>
                  <label
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontWeight: "500", marginBottom: "5px" }}>
                      Edit alt for image:
                    </span>
                    <input
                      type="text"
                      value={altStates[index]?.text || ""}
                      onChange={(event) => handleChangeAlt(index, event)}
                      style={{
                        padding: "10px",
                        borderRadius: "15px",
                        border: "0.5px solid #606060",
                      }}
                    />
                  </label>
                </div>
              ))}
            {block?.texts[0]?.id &&
              block?.texts.map((text, index) => (
                <label
                  key={text.id}
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: "500", marginBottom: "5px" }}>
                    Edit text:
                  </span>
                  <input
                    type="text"
                    value={textStates[index]?.text || ""}
                    onChange={(event) => handleChangeText(index, event)}
                    style={{
                      padding: "10px",
                      borderRadius: "15px",
                      border: "0.5px solid #606060",
                    }}
                  />
                </label>
              ))}
            <input type="submit" value="Сохранить изменения" />
          </form>
          <button onClick={() => setIsChange(false)}>Назад</button>
        </div>
      ) : (
        <div>
          <button
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
}

export default ContentAdminEdit