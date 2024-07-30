import { IUserData } from "@/types/user";
import { $host } from "./index";
import { languageEnum } from "@/app/i18n/settings";

export const getData = async (id: number, lang: languageEnum) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/translation/api/user/page?page_id=${id}&language=${lang}`
  );
  const data: IUserData = await response.json();
  return data;
};

export const sendMail = async (
  name: string,
  phone: string,
  email: string,
) => {
  const { data } = await $host.post(`/translation/application/text`, {
    name: name,
    phone: phone,
    email: email,
  });
  return data;
};

export const sendMailFile = async (
  name: string,
  phone: string,
  email: string,
  formData: FormData
) => {
  const { data } = await $host.post(`/translation/api/application/text+file?name=${name}&phone=${phone}&email=${email}`, 
    formData,
    {
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
     }
   }
  );
  return data;
};