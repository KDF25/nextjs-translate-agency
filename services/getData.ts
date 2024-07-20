import { IMailData, IUserData } from "@/types/user";
import { $host } from "./index";
import { languageEnum } from "@/app/i18n/settings";

export const getData = async (id: number, lang: languageEnum) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/translation/user/page?page_id=${id}&language=${lang}`
  );
  const data: IUserData = await response.json();
  // const data = []
  return data;
};

export const sendMail = async (params: IMailData) => {
  const {firstName, lastName, email, phoneNumber, message} = params
  const { data } = await $host.post(`/translation/user/send/mail`, {
    first_name: firstName,
    surname: lastName,
    mail: email,
    phone: phoneNumber,
    text: message,
  });
  return data;
};
