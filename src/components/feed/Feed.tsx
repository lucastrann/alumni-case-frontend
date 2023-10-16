// Feed.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import Post from '../post/Post';
import { UserData } from '../home/data';

interface FeedProps {
  data: UserData;
}

const Feed: React.FC<FeedProps> = ({ data }) => {
  return (
    <Box className="feed">
      {data.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Box>
  );
};

export default Feed;
