import React, { useState } from 'react';
import { Box, Text, Avatar, Button, Input } from '@chakra-ui/react';
import { Post, userData, Comment, UserData } from './data';
import '../css/Feed.css';
import KeycloakService from '../../services/KeycloakService';

interface PostProps {
  post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
  const [newComment, setNewComment] = useState('');

  // Use a state variable to manage the user data
  const [updatedUserData, setUpdatedUserData] = useState<UserData>(userData);

  const handleAddComment = () => {
    if (KeycloakService.isLoggedIn()) {
      if (newComment.trim() !== '') {
      const author = KeycloakService.getUsername() || 'Guest';
      post.comments.push({
        id: post.comments.length + 1,
        author: author,
        text: newComment,
        timestamp: new Date().toUTCString(),
      });
        setNewComment('');
        console.log(post.comments)
        console.log(post)
    }
    } else {
      alert("login to comment")
    }
    
  };
  

  return (
    <Box className="post">
      <Box className="post-header">
        <Avatar name={updatedUserData.user.name} src={updatedUserData.user.avatar} />
        <Text className="author">{updatedUserData.user.name}</Text>
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
