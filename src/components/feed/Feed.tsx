import React, { useState, useEffect } from 'react';
import { Box, Text, Image, Avatar, VStack, HStack, Input, Button } from '@chakra-ui/react';
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
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts: Post[] = await apiService.getAllPostsInAGroup(2);

        // Fetch replies for each post
        const postsWithReplies = await Promise.all(
          fetchedPosts.map(async (post) => {
            const replies = await apiService.getAllRepliesToPost(post.id);
            return { ...post, replies };
          })
        );

        setPosts(postsWithReplies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const postReply = async (postId: number) => {
    try {
      const response = await apiService.addReplyToPost(postId, replyContent);
      console.log('Reply posted:', response);

      // Load the updated replies for the current post
      const replies = await apiService.getAllRepliesToPost(postId);

      // Update the state to reflect the new replies
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

      // Clear the reply input field
      setReplyContent('');
    } catch (error) {
      console.error('Failed to post reply:', error);
    }
  };

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
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                width="100%"
                maxW="xl"
              >
                <Text>{post.senderId.name}</Text>
                <Text padding={3}>{reply.content}</Text>
              </Box>
            ))}
          </Box>
          {/* Input field for posting a reply */}
          <Input
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            padding={3}
          />
          <Button onClick={() => postReply(post.id)}>Post Reply</Button>
        </Box>
      ))}
    </VStack>
  );
};

export default Feed;
