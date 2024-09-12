export enum CategoryTypes {
  WOMAN = 'woman',
  MAN = 'man',
}

export type Category = {
  id: string;
  name: string;
  type: CategoryTypes;
  image: string;
};

export type SubCategory = {
  id: string;
  name: string;
  categoryId: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  subCategoryId: string | null;
  categoryId: string | null;
};

export type DB = {
  categories: Category[];
  subCategories: SubCategory[];
  products: Product[];
};
