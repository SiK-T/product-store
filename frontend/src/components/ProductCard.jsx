import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  Text,
  useColorModeValue,
  useToast,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newUpdateProduct, setUpdateProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const { deleteProduct, updateProduct } = useProductStore();
  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (id, UProduct) => {
    const { success, message } = await updateProduct(id, UProduct);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Producted Updated Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        w={"full"}
        h={48}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text mb={4} fontSize={"xl"} fontWeight={"bold"} color={textColor}>
          Rs. {product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={newUpdateProduct.name}
                onChange={(e) =>
                  setUpdateProduct({
                    ...newUpdateProduct,
                    name: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Product Price"
                name="price"
                value={newUpdateProduct.price}
                onChange={(e) =>
                  setUpdateProduct({
                    ...newUpdateProduct,
                    price: e.target.value,
                  })
                }
                type="number"
              />
              <Input
                placeholder="Product Image"
                name="image"
                value={newUpdateProduct.image}
                onChange={(e) =>
                  setUpdateProduct({
                    ...newUpdateProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, newUpdateProduct)}
            >
              Update
            </Button>
            <Button variant="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
