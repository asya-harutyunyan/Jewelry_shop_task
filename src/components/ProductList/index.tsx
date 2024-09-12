import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Product } from '../../types';

type ProductListProps = {
  productListData: Product[];
};

const ProductList: FC<ProductListProps> = ({ productListData }) => {
  return (
    <Flex
      flexWrap="wrap"
      gap="20px"
      justifyContent={{ base: 'center', lg: 'flex-start' }}
    >
      {productListData.map((product) => (
        <Box
          key={product.id}
          bg="#fff"
          w="194px"
          h="170px"
          borderRadius="5px"
          p="10px"
        >
          <Box width="174px" height="114px" borderRadius="5px, 5px, 0px, 0px">
            <Image src={product.image} alt="Product" width={174} height={114} />
          </Box>
          <Flex justifyContent="space-between" mt="14px">
            <Text>{product.name}</Text>
            <Text fontWeight={600}>{product.price} $</Text>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default ProductList;
