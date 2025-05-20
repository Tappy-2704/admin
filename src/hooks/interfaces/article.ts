export interface IArticle {
  _id: string;
  vn: string[];
  en: string[];
  name: string;
  vocabulary: string;
  catId: {
    _id: string;
    title: string;
  };
  createdAt: string;
}
