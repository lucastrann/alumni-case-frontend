import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Image,
  Avatar,
  VStack,
  HStack,
  Input,
  Button,
  Spinner,
  useColorMode,
  Icon, // Added Icon component for icons
} from '@chakra-ui/react';
import { MdEvent } from 'react-icons/md' // Import the event icon
import ApiService from '../../services/ApiService';
import Post from '../../types/Post';
import KeycloakService from '../../services/KeycloakService';
import CreateNewPost from '../createPost/CreateNewPost';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [replyContents, setReplyContents] = useState<{ [postId: number]: string }>({});
  const { colorMode, toggleColorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const apiService = new ApiService('https://alumni-web.azurewebsites.net/api/v1/', `${KeycloakService.getToken()}`);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts: Post[] = await apiService.getAllPosts();

        console.log(fetchedPosts);

        const postsWithReplies = await Promise.all(
          fetchedPosts.map(async (post) => {
            const replies = await apiService.getAllRepliesToPost(post.id);
            return { ...post, replies };
          })
        );

        setPosts(postsWithReplies);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleReplyContentChange = (postId: number, content: string) => {
    setReplyContents({ ...replyContents, [postId]: content });
  };

  const postReply = async (postId: number) => {
    try {
      const content = replyContents[postId];
      if (content !== undefined) {
        const response = await apiService.addReplyToPost(postId, content);

        const replies = await apiService.getAllRepliesToPost(postId);

        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              replies: replies,
            };
          }
          return post;
        });

        setPosts(updatedPosts);

        setReplyContents({ ...replyContents, [postId]: '' });
      } else {
        console.error('content is undefined');
      }
    } catch (error) {
      console.error('Failed to post reply:', error);
    }
  };

  return (
    <VStack spacing={4}>
      <CreateNewPost />
      {loading ? (
        <Spinner size="xl" color="teal.500" />
      ) : (
        posts.map((post) => (
          <Box
            key={post.id}
            borderWidth="1px"
            borderRadius={30}
            overflow="hidden"
            boxShadow="md"
            width="100%"
            maxW="xl"
            bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            color={colorMode === 'light' ? 'gray.800' : 'white'}
            p={6}
          >
            <HStack spacing={3} pb={2}>
              <Avatar src={post.senderId.picture} name={post.senderId.name} />
              <Text fontWeight="bold" fontSize="lg">
                {post.senderId.name}
              </Text>
              {post.isEvent && (
                <Icon as={MdEvent} color="teal.500" fontSize="1.5em" title="Event" />
              )}
            </HStack>
            <Text fontSize="xl" fontWeight="semibold" pb={2}>
              {post.title}
            </Text>
            {post.isEvent && (
              <Text
                fontWeight="bold"
                fontSize="large"
                textColor={colorMode === 'light' ? 'light.tertiary' : 'dark.tertiary'}
              >
                {new Date(post.startsAt).toLocaleString()} -  {new Date(post.endsAt).toLocaleString()}
              </Text>
            )}
            <Text pb={4}>{post.content}</Text>
            <Box>
              {post.replies.map((reply, index) => (
                <Box
                  key={index}
                  borderWidth={2}
                  borderRadius={30}
                  overflow="hidden"
                  boxShadow="md"
                  width="100%"
                  maxW="xl"
                  bg={colorMode === 'light' ? 'light.replyBg' : 'dark.replyBg'}
                  color={colorMode === 'light' ? 'light.text' : 'dark.text'}
                  p={3}
                  my={1}
                  position="relative"
                >
                  <HStack pb={0}>
                    <Text fontWeight="bold" fontSize="md">
                      {reply.senderId.name}
                    </Text>
                  </HStack>
                  <Text>{reply.content}</Text>
                </Box>
              ))}
            </Box>
            <HStack spacing={3} mt={3}>
              <Input
                borderWidth={2}
                borderRadius={30}
                bg={colorMode === 'light' ? 'light.replyBg' : 'dark.replyBg'}
                value={replyContents[post.id] || ''}
                onChange={(e) => handleReplyContentChange(post.id, e.target.value)}
                placeholder="Write a reply..."
              />
              <Button
                onClick={() => postReply(post.id)}
                borderWidth="1px"
                borderRadius={20}
                bg={colorMode === 'light' ? 'light.buttonBg' : 'dark.buttonBg'}
                variant="solid"
              >
                Reply
              </Button>
            </HStack>
          </Box>
        ))
      )}
    </VStack>
  );
};

export default Feed;
