import { languageEnum, languages } from "@/app/i18n/settings";
import { $authHost, $host } from "./index";
import qs from "qs";
import { IText } from "@/types/user";

export const Auth = async (username: string, password: string) => {
  try {
    const { data } = await $host.post(
      "/translation/api/authentication/token",
     ({
        username: username,
        password: password,
      })
    );
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("isAuth", "true");
    return data;
  } catch (error) {
    // Обработка ошибок
    alert("Неверные данные!");
    throw error;
  }
};

export const putPageSeo = async (seoId: number, title:string, description:string, keywords:string) => {
  try {
    const { data } = await $authHost.put(`/translation/api/page/seo`, [{
      id: seoId,
      title: title,
      description: description,
      keywords: keywords,
    }]);
    return data;
  } catch (error) {
    alert(`Ошибка... ${error}`);
  }
};

export const putContentText = async ( text: {
  id: number
  text: string,
}[]) => {
  try {
    const { data } = await $authHost.put("/page/block/text",  text
  );
    return data;
  } catch (error) {
    alert(`Ошибка... ${error}`);
  }
};

export const putContentFile = async (id: number, formData: FormData) => {
  try {
    const { data } = await $authHost.put(
      `/translation/api/page/block/file?file_id=${id}`,
      formData,
     {
       headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
    );
    return data;
  } catch (error) {
    alert(`Ошибка... ${error}`);
  }
};

export const putContentAlt = async (alt: {
  id: number
  text: string,
}[]) => {
  try {
    const { data } = await $authHost.put("/translation/api/page/block/file/alt", alt);
    return data;
  } catch (error) {
    alert(`Ошибка... ${error}`);
  }
};

export const addBlock = async (sectionId: number, textRu?: string, textUz?: string, textEn?: string) => {
  try {
    const { data } = await $authHost.post("/translation/api/page/block", {
      section_id: sectionId,
      name: "admin's block",
      text: [
        {
          text: textRu,
          language: "ru",
        },
        {
          text: textUz,
          language: "uz",
        },
        {
          text: textEn,
          language: "en",
        },
      ],
    });
    return data;
  } catch (error) {
    alert(`Ошибка... ${error}`);
  }
};

export const addFile = async (blockId: number, formData: FormData) => {
  try {
    const { data } = await $authHost.post(
      `/translation/api/page/block/file?block_id=${blockId}`,
      formData,
      {
        headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
       }
     }
    );
    formData.delete("file");
    return data;
  } catch (error) {
    alert(`Ошибка... ${error}`);
  }
};

export const addAlt = async (fileId: number, alt: {language: string, text: string}[]) => {
  try {
    const { data } = await $authHost.post("/translation/api/page/block/file/alt", {
      file_id: fileId,
      alt: alt
    });
    return data;
  } catch (error) {
    alert(`Ошибка... ${error}`);
  }
};

export const addText = async (blockId: number, texts: IText[]) => {
  try {
    const { data } = await $authHost.post("/translation/api/page/block/text", {
      block_id: blockId,
      text: texts
    });
    return data;
  } catch (error) {
    alert(`Ошибка... ${error}`);
  }
};

export const deleteBlock = async (blockId: number) => {
  try {
    const { data } = await $authHost.delete(
      `/translation/api/page/block?block_id=${blockId}`
    );
    return data;
  } catch (error) {
    alert(`Ошибка... ${error}. НЕВОЗМОЖНО УДАЛИТЬ ПОСЛЕДНИЙ ОСТАВШИЙСЯ БЛОК.`);
  }
};

export const getRevalidate = async (path: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/revalidate?path=${path}`
      // `http://localhost:3000/api/revalidate?path=${path}`
    );
    return response;
  } catch (error) {
    console.log(error)
  }
};