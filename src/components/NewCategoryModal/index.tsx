import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { GrUser, GrUserFemale } from 'react-icons/gr';
import { Category, CategoryTypes } from '../../types';
import { CategoryService } from '../../services/categories.service';

type NewCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

const NewCategoryModal: FC<NewCategoryModalProps> = ({
  isOpen,
  onClose,
  refetch,
}) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      id: '',
      name: '',
      type: CategoryTypes.WOMAN,
      image: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: (newCategory: Category) =>
      CategoryService.addCategory(newCategory),
    onSuccess: () => {
      refetch();
    },
  });

  const handleAddCategory = (data: {
    name: string;
    type: CategoryTypes;
    image: string;
  }) => {
    const newCategory: Category = {
      id: uuidv4(),
      name: data.name,
      type: data.type,
      image: data.image,
    };
    mutate(newCategory);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить категорию</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <ModalBody>
            <Flex flexDirection="column" mb="15px">
              <Controller
                name="type"
                control={control}
                defaultValue={CategoryTypes.WOMAN}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <Flex gap="10px">
                      <Box
                        display="flex"
                        alignItems="center"
                        w="50%"
                        h="32px"
                        borderRadius="5px"
                        bg="#fff"
                        boxShadow="0px 0px 10px 0px #00000040"
                        p="8px"
                      >
                        <Radio value={CategoryTypes.WOMAN}>
                          <Icon
                            as={GrUserFemale}
                            mr="10px"
                            color={
                              field.value === CategoryTypes.WOMAN
                                ? 'blue'
                                : 'gray'
                            }
                          />
                        </Radio>
                        женский
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        w="50%"
                        h="32px"
                        borderRadius="5px"
                        bg="#fff"
                        boxShadow="0px 0px 10px 0px #00000040"
                        p="8px"
                      >
                        <Radio value={CategoryTypes.MAN}>
                          <Icon
                            as={GrUser}
                            mr="10px"
                            color={
                              field.value === CategoryTypes.MAN
                                ? 'blue'
                                : 'gray'
                            }
                          />
                          мужской
                        </Radio>
                      </Box>
                    </Flex>
                  </RadioGroup>
                )}
              />
            </Flex>
            <Flex flexDirection="column" gap="15px">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Категория" />
                )}
              />
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Фото (URL)" />
                )}
              />
            </Flex>
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

export default NewCategoryModal;
