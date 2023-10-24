
type Post = {
  id: number;
  title: string;
  content: string;
  replies: Array<{
    senderId: {
      name: string;
    }
    content: string
  }>;
  senderId: {
    id: string;
    name: string;
    picture: string;
  };
};

export default Post;