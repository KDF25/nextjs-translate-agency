import { $host } from "./index";

export const sendMail = async (
    name: string,
    phone: string,
    email: string,
  ) => {
    const { data } = await $host.post(`/translation/api/application/text?name=${name}&phone=${phone}&email=${email}`);
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