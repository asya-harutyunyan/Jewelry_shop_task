import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { CategoryService } from '../../services/categories.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SubCategory } from '../../types';

type NewSubCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  selectedCategoryId: string;
};

const NewSubCategoryModal: FC<NewSubCategoryModalProps> = ({
  isOpen,
  onClose,
  refetch,
  selectedCategoryId,
}) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      id: '',
      name: '',
    },
  });

  const { data: category } = useQuery({
    queryKey: ['categories', selectedCategoryId],
    queryFn: () => CategoryService.getCategoryById(selectedCategoryId),
  });

  const handleAddSubCategory = (data: { name: string }) => {
    const newSubCategory: SubCategory = {
      id: uuidv4(),
      name: data.name,
      categoryId: selectedCategoryId,
    };

    addNewSubCategory(newSubCategory);
    reset();
    onClose();
  };

  const { mutate: addNewSubCategory } = useMutation({
    mutationFn: CategoryService.addSubCategory,
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{category?.name}: Добавить подкатегория</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(handleAddSubCategory)}>
          <ModalBody>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Подкатегория" />
              )}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              width="100%"
              bg="#0008C1"
              type="submit"
              color="#fff"
              borderRadius="25px"
              _hover={{ bg: '#0008C1', color: '#fff' }}
            >
              Добавить
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default NewSubCategoryModal;
