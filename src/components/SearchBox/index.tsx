import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FC } from 'react';
import NewProductModal from '../NewProductModal';
import { useProductListContext } from '../../context/ProductContext';

type SearchBoxProps = object;

const SearchBox: FC<SearchBoxProps> = () => {
  const { setSearch, search } = useProductListContext();
  return (
    <Flex
      width="100%"
      height="70px"
      bg="#fff"
      alignItems="center"
      mb="40px"
      px={{ base: '16px', lg: '50px' }}
    >
      <Flex justifyContent="center" flex="1">
        <InputGroup
          maxW="387.17px"
          height="40px"
          bg="#E8EAEB"
          borderRadius="25px"
        >
          <Input
            placeholder="Поиск"
            borderRadius="25px"
            onChange={(e) => setSearch(e.target.value)}
            value={search || ''}
          />
          <InputRightElement
            mt="4px"
            mr="5px"
            bg="#0008C1"
            height="32px"
            width="32px"
            borderRadius="50%"
          >
            <SearchIcon color="#fff" />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <NewProductModal />
    </Flex>
  );
};

export default SearchBox;
