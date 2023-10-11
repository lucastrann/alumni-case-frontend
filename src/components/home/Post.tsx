import React, { useState } from 'react';
import { Box, Text, Avatar, Button, Input } from '@chakra-ui/react';
import { Post, userData } from './data';
import '../css/Feed.css';

interface PostProps {
  post: Post;
}

const userName = userData.user.name

const PostComponent: React.FC<PostProps> = ({ post }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      // Add a new comment to the post's comments array
      post.comments.push({
        id: post.comments.length + 1,
        author: userData.user.name,
        text: newComment,
        timestamp: new Date().toUTCString(),
      });
      setNewComment('');
    }
  };

  return (
    <Box className="post">
      <Box className="post-header">
        <Avatar name={userName} src={userData.user.avatar} />
        <Text className="author">{userName}</Text>
      </Box>
      <Text className="post-text">{post.text}</Text>

      <div className="comments">
        {post.comments.map((comment) => (
          <div key={comment.id} className="comment">
            <b>{comment.author}:</b> {comment.text}
          </div>
        ))}
      </div>

      <div className="comment-input">
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleAddComment}>
          Comment
        </Button>
      </div>
    </Box>
  );
};

export default PostComponent;