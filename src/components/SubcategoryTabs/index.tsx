import { FC, useEffect } from 'react';
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { SubCategory } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '../../services/categories.service';
import { AddIcon } from '@chakra-ui/icons';
import NewSubCategoryModal from '../NewSubCategoryModal';
import ProductList from '../ProductList';
import { useProductListContext } from '../../context/ProductContext';

type SubcategoryTabsProps = {
  selectedCategoryId: string;
};

const SubcategoryTabs: FC<SubcategoryTabsProps> = ({ selectedCategoryId }) => {
  const { productListData, setSelectedSubCategoryId } = useProductListContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: subCategories, refetch } = useQuery({
    queryFn: CategoryService.getSubCategoriesByCategoryId.bind(
      null,
      selectedCategoryId
    ),
    queryKey: ['get subcategory by id', selectedCategoryId],
    initialData: [],
  });

  useEffect(() => {
    if (subCategories.length > 0) {
      setSelectedSubCategoryId(subCategories[0].id);
    }
  }, [setSelectedSubCategoryId, subCategories]);

  return (
    <>
      <Tabs>
        <TabList display="flex" flexWrap="wrap">
          {subCategories.map((subcategory: SubCategory) => (
            <Tab
              key={subcategory.id}
              onClick={() => setSelectedSubCategoryId(subcategory.id)}
              color="#000"
              _selected={{ borderBottom: '6px solid #0008C1' }}
            >
              {subcategory.name}
            </Tab>
          ))}
          <Button
            ml="20px"
            onClick={onOpen}
            width="47.77px"
            height="40px"
            bg="#fff"
            mt={{ base: '15px', lg: '0' }}
          >
            <AddIcon />
          </Button>
        </TabList>

        <TabPanels>
          {subCategories.map((subcategory: SubCategory) => (
            <TabPanel key={subcategory.id}>
              <ProductList productListData={productListData} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>

      <NewSubCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
        selectedCategoryId={selectedCategoryId}
      />
    </>
  );
};

export default SubcategoryTabs;
