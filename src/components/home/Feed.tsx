// Feed.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import Post from './Post';
import { UserData } from './data';

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
