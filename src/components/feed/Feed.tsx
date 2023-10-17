import React, { useState, useEffect } from 'react';
import { Box, Text, Image, Avatar, VStack, HStack } from '@chakra-ui/react';
import ApiService from '../../services/ApiService';

const apiService = new ApiService('http://localhost:8080/api/v1/');

type Post = {
  id: number;
  title: string;
  content: string;
  replies: Array<{ content: string }>;
  senderId: {
    id: string;
    name: string;
    picture: string;
  };
};

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await apiService.getAllPostsInAGroup(2);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <VStack className="feed" spacing={4}>
      {posts.map((post) => (
        <Box
          key={post.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          width="100%"
          maxW="xl"
        >
          <HStack spacing={3} padding={3}>
            <Avatar src={post.senderId.picture} name={post.senderId.name} />
            <Text fontWeight="bold">{post.senderId.name}</Text>
          </HStack>
          <Text fontSize="xl" fontWeight="semibold" padding={3}>
            {post.title}
          </Text>
          <Text padding={3}>{post.content}</Text>
          <Box>
            {post.replies.map((reply, index) => (
              <Text key={index} padding={3}>
                {reply.content}
              </Text>
            ))}
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default Feed;
