
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

export default Post;