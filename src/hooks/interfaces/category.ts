export interface ICategory {
  _id: string;
  title: string;
  topicId: {
    _id: string;
    title: string;
  };
  createdAt: string;
}
export interface IOption {
  label: string;
  value: string | number;
}
