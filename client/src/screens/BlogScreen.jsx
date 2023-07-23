import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogByCat } from '../redux/slices/blogsSlice';
import { Link as ReactLink, useParams } from 'react-router-dom';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import NavButton from '../components/NavButton';

export const BlogScreen = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { blogs, loading, error, page, totalPages } = useSelector(
    (state) => state.blogs
  );
  console.log('STATEBACK==========>', page);

  useEffect(() => {
    dispatch(getBlogByCat({ category, page }));
    window.scroll(0, 0);
  }, [category, dispatch, page]);

  return (
    <>
      <VStack spacing="30px" minHeight="100vh">
        <Heading fontSize="5xl" mb="16">
          {/* {pageTitle} */}
          some content
        </Heading>
        {loading ? (
          <Stack direction={'row'} spacing={'4'}>
            <Spinner
              mt="20"
              thickness="2px"
              speed="0.65"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Stack>
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Oups!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <Heading>
              {category?.charAt(0).toUpperCase() + category.slice(1)} Blogs
            </Heading>
            {blogs.map((blog) => (
              <Box
                key={blog._id}
                maxW={{ base: '3xl', lg: '7xl' }}
                px={{ base: '6', md: '8', lg: '20' }}
                py={'6'}
              >
                <Stack direction={{ base: 'column', lg: 'row' }} spacing={'7'}>
                  <Image
                    src={blog.image}
                    minW={{ lg: '400px' }}
                    maxH="280px"
                    loading={<Spinner />}
                    fit="cover"
                  />
                  <Flex direction="column">
                    <Text fontSize="2xl" fontWeight="semibold">
                      {blog.title}
                    </Text>
                    <Text noOfLines={'5'} fontSize={'lg'}>
                      {blog.contentOne}
                    </Text>
                    <Spacer />
                    <Flex width={'full'} py="2">
                      <Box display={{ base: 'none', md: 'flex' }}>
                        <Text>By {blog.author}</Text>
                        <Text mx="2"></Text>
                        <Text> {new Date(blog.createdAt).toDateString()}</Text>
                        <Text mx="2"></Text>
                      </Box>
                      <Text>
                        Category:{' '}
                        <Link
                          pl="1"
                          as={ReactLink}
                          to={`/blog/${blog.category}`}
                        >
                          {category?.charAt(0).toUpperCase() +
                            category.slice(1)}
                        </Link>
                      </Text>
                      <Spacer />
                      <Link as={ReactLink} to={`/${blog._id}`}>
                        Read More...
                      </Link>
                    </Flex>
                    <Divider />
                  </Flex>
                </Stack>
              </Box>
            ))}
          </>
        )}
      </VStack>
      <div
        style={{
          display: 'flex',
          marginLeft: '50vh',
          marginRight: '50vh',
          height: '100px',
          justifyContent: 'center',
        }}
      >
        {totalPages > 1 ? (
          <>
            <NavButton direction={'prev'} />
            <span
              style={{
                alignSelf: 'center',
                marginLeft: '10px',
                marginRight: '10px',
                padding: '10px',
                fontSize: '16px',
                fontWeigt: 'bold',
              }}
            >
              {page}
            </span>
            <NavButton direction={'next'} />
          </>
        ) : (
          <span
            style={{
              alignSelf: 'center',
              marginLeft: '10px',
              marginRight: '10px',
              padding: '10px',
              fontSize: '16px',
              fontWeigt: 'bold',
            }}
          >
            {page}
          </span>
        )}
      </div>
    </>
  );
};
