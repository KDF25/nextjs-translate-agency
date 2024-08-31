import { languageEnum } from "@/app/i18n/settings";
import { IUserData } from "@/types/user";

export const getData = async (id: number, lang: languageEnum) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/translation/api/user/page/?page_id=${id}&language=${lang}`,
    {
      cache: "no-store",
    }
  );
  const data: IUserData = await response.json();
  return data;
};