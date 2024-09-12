import $apiClient from '../axios';
import { Category, CategoryTypes, Product, SubCategory } from '../types';

export class CategoryService {
  //GET
  static categoryList(type: CategoryTypes): Promise<Category[]> {
    return $apiClient.get(`/categories?type=${type}`);
  }

  static getCategoryById(categoryId: string): Promise<Category> {
    return $apiClient.get(`/categories/${categoryId}`);
  }

  static getSubCategoriesByCategoryId(
    categoryId: string
  ): Promise<SubCategory[]> {
    return $apiClient.get(`/subCategories?categoryId=${categoryId}`);
  }
  static getProductListBySubCategoryId(
    subCategoryId: string,
    search: string | null
  ): Promise<Product[]> {
    return $apiClient.get(`/products`, {
      params: {
        name: search,
        subCategoryId,
      },
    });
  }

  //POST
  static addCategory(category: Category) {
    return $apiClient.post('/categories', category);
  }

  static addSubCategory(subCategory: SubCategory) {
    return $apiClient.post(`/subCategories`, subCategory);
  }

  static addNewProduct(product: Product) {
    return $apiClient.post(`/products`, product);
  }
}
