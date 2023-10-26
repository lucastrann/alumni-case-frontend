
type Post = {
  id: number;
  title: string;
  content: string;
  isEvent: boolean;
  startsAt: string;
  endsAt: string;
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