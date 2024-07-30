import { languageEnum } from "@/app/i18n/settings";

export interface IUserData {
    id: number;
    seo_id: number;
    name: string;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    sections: ISection[];
    language: languageEnum;
  }
  
export interface ISection {
    id: number;
    name: string;
    blocks: IBlock[];
  }
  
export  interface IBlock {
    id: number;
    name: string;
    files: IFile[];
    texts: IText[];
  }
  
  interface IFile {
    id: number;
    url: string;
    alts: IAlt[];
  }
  
  interface IAlt {
    id: number;
    text: string;
  }
  
  export interface IText {
    id: number;
    text: string;
    language?: string;
  }
  

 export interface IMailData {
    name: string;
    email: string;
    phoneNumber: string;
    file?: FormData | null;
  }

export interface ILangPageProps {
  lng: languageEnum
}

export interface IHomePageProps {
  section: ISection;
  isAdmin?: boolean;
  pageId?: number;
  lng: languageEnum;
}