import { useQuery } from '@tanstack/react-query';
import SubcategoryTabs from '../components/SubcategoryTabs';
import { CategoryService } from '../services/categories.service';
import { Category, CategoryTypes } from '../types';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import SearchBox from '../components/SearchBox';

import { GrUserFemale, GrUser } from 'react-icons/gr';
import NewCategoryModal from '../components/NewCategoryModal';

const ProductCatalog = () => {
  const [selectedType, setSelectedType] = useState(CategoryTypes.WOMAN);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: categories, refetch } = useQuery({
    queryKey: ['categories', selectedType],
    queryFn: () => CategoryService.categoryList(selectedType),
    initialData: [],
  });

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedType]);

  return (
    <Container maxW="100%" minH="100vh" bg="#E6E6E6" p="0">
      <SearchBox />
      <Container maxW="1200px" m="0 auto" p={{ base: '0 16px', lg: '0' }}>
        <Flex wrap="wrap" gap="20px" mb="26px">
          <Flex flexDirection="column" gap="8px">
            <Box
              w="50px"
              h="32px"
              borderRadius="5px"
              bg="#fff"
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              onClick={() => setSelectedType(CategoryTypes.WOMAN)}
            >
              <Icon
                as={GrUserFemale}
                color={selectedType === CategoryTypes.WOMAN ? 'blue' : 'gray'}
              />
            </Box>
            <Box
              w="50px"
              h="32px"
              borderRadius="5px"
              bg="#fff"
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              onClick={() => setSelectedType(CategoryTypes.MAN)}
            >
              <Icon
                as={GrUser}
                color={selectedType === CategoryTypes.MAN ? 'blue' : 'gray'}
              />
            </Box>
          </Flex>
          {categories.map((category: Category) => (
            <Box
              key={category.id}
              cursor="pointer"
              borderRadius="5px"
              boxShadow=" 0px 0px 10px 0px #00000040"
              width="140px"
              height="80px"
              textAlign="center"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              bg="#fff"
              _hover={{
                border: '2px solid #939393',
              }}
              border={
                selectedCategory === category.id ? '2px solid #939393' : 'none'
              }
              onClick={() => setSelectedCategory(category.id)}
            >
              <Box width="43px" height="42px">
                <Image src={category.image} alt="Category" />
              </Box>
              <Text>{category.name}</Text>
            </Box>
          ))}
          <Button onClick={onOpen} width="50px" height="80px" bg="#fff">
            <AddIcon />
          </Button>
        </Flex>
        <NewCategoryModal isOpen={isOpen} onClose={onClose} refetch={refetch} />
        {selectedCategory && (
          <SubcategoryTabs selectedCategoryId={selectedCategory} />
        )}
      </Container>
    </Container>
  );
};

export default ProductCatalog;
