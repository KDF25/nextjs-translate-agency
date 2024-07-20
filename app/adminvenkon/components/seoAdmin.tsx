"use client";

import { languageEnum } from "@/app/i18n/settings";
import { putPageSeo } from "@/services/admin";
import { useState } from "react";

interface SeoAdminProps {
  seo: {
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
  };
  lng: languageEnum;
  pageId: number;
}

export default function SeoAdmin({ seo, lng, pageId }: SeoAdminProps) {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    putPageSeo(pageId, lng, title!, description!, keywords!); // Asserting non-null since inputs are initially null
    setIsChange(false);
    setTitle(null);
    setDescription(null);
    setKeywords(null);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
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
              marginBottom: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
                Title {lng}:{" "}
              </span>
              <input
                style={{
                  padding: "10px",
                  borderRadius: "15px",
                  border: "0.5px solid #606060",
                }}
                type="text"
                value={title || ""}
                onChange={handleChangeTitle}
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
              <span style={{ fontWeight: "500", marginBottom: "10px" }}>
                Description {lng}:{" "}
              </span>
              <input
                style={{
                  padding: "10px",
                  borderRadius: "15px",
                  border: "0.5px solid #606060",
                }}
                type="text"
                value={description || ""}
                onChange={handleChangeDescription}
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
              <span style={{ fontWeight: "500", marginBottom: "10px" }}>
                Keywords {lng}:{" "}
              </span>
              <input
                style={{
                  padding: "10px",
                  borderRadius: "15px",
                  border: "0.5px solid #606060",
                }}
                type="text"
                value={keywords || ""}
                onChange={handleChangeKeywords}
              />
            </label>
            <input
              type="submit"
              value="Отправить"
              disabled={
                !title || !description || (!keywords && true) // disabled attribute expects a boolean
              }
            />
          </form>
          <button onClick={() => setIsChange(false)}>Назад</button>
        </div>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          <div>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: "700" }}>Title: </span>{" "}
              {seo?.seo_title}
            </div>
            <div style={{ marginBottom: "10px", fontWeight: "500" }}>
              <span style={{ fontWeight: "700" }}>Description: </span>
              {seo?.seo_description}
            </div>
            <div style={{ marginBottom: "10px", fontWeight: "400" }}>
              <span style={{ fontWeight: "700" }}>Keywords: </span>
              {seo?.seo_keywords}
            </div>
          </div>
          <div>
            <button onClick={() => setIsChange(true)}>Изменить</button>
          </div>
        </div>
      )}
    </div>
  );
}
