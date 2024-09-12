import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '../services/categories.service';
import { Product } from '../types';

export const ProductListContext = createContext<{
  refetch: () => void;
  productListData: Product[];
  setSelectedSubCategoryId: Dispatch<SetStateAction<string | null>>;
  setSearch: Dispatch<SetStateAction<string | null>>;
  selectedSubCategoryId: string | null;
  search: null | string;
}>({
  refetch: () => {},
  productListData: [],
  setSelectedSubCategoryId: () => {},
  selectedSubCategoryId: null,
  setSearch: () => {},
  search: null,
});

export const ProductListProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState<string | null>(null);
  const [debouncedSearch, setDebounceSearch] = useState<string | null>('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    null | string
  >(null);

  const { data: productListData = [], refetch } = useQuery({
    queryFn: CategoryService.getProductListBySubCategoryId.bind(
      null,
      selectedSubCategoryId!,
      debouncedSearch
    ),
    queryKey: [selectedSubCategoryId, 'product-list', debouncedSearch],
    enabled: !!selectedSubCategoryId,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <ProductListContext.Provider
      value={{
        refetch,
        productListData,
        setSelectedSubCategoryId,
        selectedSubCategoryId,
        setSearch,
        search,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
};
