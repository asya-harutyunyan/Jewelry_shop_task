import { useContext } from "react";
import { ProductListContext } from "./ProductListContextProvider";

export const useProductListContext = () => useContext(ProductListContext);
