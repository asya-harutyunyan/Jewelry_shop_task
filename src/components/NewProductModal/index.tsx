import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Category, CategoryTypes, Product, SubCategory } from '../../types';
import { CategoryService } from '../../services/categories.service';
import { GrUser, GrUserFemale } from 'react-icons/gr';
import { useProductListContext } from '../../context/ProductContext';

type NewProductModalProps = object;

const NewProductModal: FC<NewProductModalProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { refetch } = useProductListContext();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      id: '',
      name: '',
      price: '',
      image: '',
      subCategoryId: '',
      categoryId: '',
    },
  });
  const [selectedType, setSelectedType] = useState(CategoryTypes.WOMAN);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    string | null
  >(null);

  const { data: categories } = useQuery({
    queryKey: ['categories', selectedType],
    queryFn: () => CategoryService.categoryList(selectedType),
    initialData: [],
  });

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedType]);

  const { data: subCategories = [] } = useQuery({
    queryFn: () =>
      CategoryService.getSubCategoriesByCategoryId(selectedCategoryId!),
    queryKey: ['subcategories', selectedCategoryId],
    enabled: !!selectedCategoryId,
    initialData: [],
  });
  const { mutate } = useMutation({
    mutationFn: (newProduct: Product) =>
      CategoryService.addNewProduct(newProduct),
    onSuccess: () => {
      refetch();
      onClose();
    },
  });

  const handleAddProduct = (data: {
    name: string;
    price: string;
    categoryId: string;
    subCategoryId: string;
    image: string;
  }) => {
    const newProduct: Product = {
      id: uuidv4(),
      name: data.name,
      price: Number(data.price),
      image: data.image,
      categoryId: selectedCategoryId,
      subCategoryId: selectedSubCategoryId,
    };
    mutate(newProduct);
    reset();
  };

  return (
    <>
      <Button onClick={onOpen} width="200px" height="40px" bg="#fff">
        Добавить изделия
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить изделия</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleAddProduct)}>
              <Flex alignItems="center" gap="20px">
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
                    border="2px solid #E8E8E8"
                    onClick={() => setSelectedType(CategoryTypes.WOMAN)}
                  >
                    <Icon
                      as={GrUserFemale}
                      color={
                        selectedType === CategoryTypes.WOMAN ? 'blue' : 'gray'
                      }
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
                    border="2px solid #E8E8E8"
                    cursor="pointer"
                    onClick={() => setSelectedType(CategoryTypes.MAN)}
                  >
                    <Icon
                      as={GrUser}
                      color={
                        selectedType === CategoryTypes.MAN ? 'blue' : 'gray'
                      }
                    />
                  </Box>
                </Flex>
                <Flex gap={4} wrap="wrap" mt={4}>
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
                        selectedCategoryId === category.id
                          ? '2px solid #939393'
                          : 'none'
                      }
                      onClick={() => setSelectedCategoryId(category.id)}
                    >
                      <Box width="43px" height="42px">
                        <Image src={category.image} alt="Category" />
                      </Box>
                      <Text>{category.name}</Text>
                    </Box>
                  ))}
                </Flex>
              </Flex>

              <Flex gap={4} wrap="wrap" mt={4}>
                {subCategories.map((subcategory: SubCategory) => (
                  <Box
                    key={subcategory.id}
                    cursor="pointer"
                    color="#000"
                    mb="20px"
                    onClick={() => setSelectedSubCategoryId(subcategory.id)}
                    borderBottom={
                      selectedSubCategoryId === subcategory.id
                        ? '5px solid #0008C1'
                        : 'none'
                    }
                  >
                    <Text> {subcategory.name}</Text>
                  </Box>
                ))}
              </Flex>
              <Flex gap="20px" mb="20px">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Артикул" />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Цена" />
                  )}
                />
              </Flex>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Фото (URL)" />
                )}
              />
              <Button
                width="160px"
                bg="#0008C1"
                type="submit"
                color="#fff"
                _hover={{ bg: '#0008C1', color: '#fff' }}
                mt={4}
              >
                Добавить
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewProductModal;
