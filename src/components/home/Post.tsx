import React, { useState } from 'react';
import { Box, Text, Avatar, Button, Input } from '@chakra-ui/react';
import { Post, userData, Comment, UserData } from './data';
import '../css/Feed.css';

interface PostProps {
  post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
  const [newComment, setNewComment] = useState('');

  // Use a state variable to manage the user data
  const [updatedUserData, setUpdatedUserData] = useState<UserData>(userData);

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const updatedPost = updatedUserData.posts.find((p) => p.id === post.id);

      if (updatedPost) {
        const newCommentData: Comment = {
          id: updatedPost.comments.length + 1, // Generate a new comment ID
          author: updatedUserData.user.name,
          text: newComment,
          timestamp: new Date().toUTCString(),
        };

        updatedPost.comments.push(newCommentData);

        // Update the user data with the modified post
        setUpdatedUserData({
          ...updatedUserData,
          posts: updatedUserData.posts.map((p) =>
            p.id === post.id ? updatedPost : p
          ),
        });

        setNewComment('');
      }
      console.log(updatedUserData);
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
