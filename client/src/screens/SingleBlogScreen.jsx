import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleBlog } from '../redux/slices/blogsSlice';

const SingleBlogScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getSingleBlog({ id }));
  }, [id]);
  return (
    <VStack spacing={'30px'} minH={'100vh'}>
      {loading ? (
        <Stack direction={'row'} spacing={'4'}>
          <Spinner
            mt="20"
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.color"
            color="blue"
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oups!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        blog && (
          <Container
            maxW="4xl"
            py={{ base: '12', md: '24' }}
            px={{ base: '0', md: '8' }}
            minH="4xl"
          >
            <Heading textAlign="center" size="lg">
              {blog.title}
            </Heading>
            <Flex width="full" py="2" justifyContent="center" px="2">
              <Text>By {blog.author}</Text>
              <Text mx="2">|</Text>
              <Text>{new Date(blog.createdAt).toDateString()}</Text>
              <Text mx="2">|</Text>
              <Text>
                {blog.category?.charAt(0).toUpperCase() +
                  blog.category.slice(1)}
              </Text>
            </Flex>
            <Image src={blog.image} />
            <Text
              px={'2'}
              mt="5"
              lineHeight={{ base: 7, md: '8' }}
              fontSize={{ base: 'md', md: 'lg' }}
            >
              {blog.contentOne}
            </Text>
            <Box m='10'></Box>
            <Text
              px={'2'}
              mt="5"
              lineHeight={{ base: 7, md: '8' }}
              fontSize={{ base: 'md', md: 'lg' }}
            >
              {blog.contentTwo}
            </Text>

          </Container>
        )
      )}
    </VStack>
  );
};

export default SingleBlogScreen;
