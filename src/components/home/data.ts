// data.ts
export interface User {
  name: string;
  avatar: string;
}

export interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: number;
  text: string;
  timestamp: string;
  comments: Comment[];
}

export interface UserData {
  user: User;
  posts: Post[];
}

export const userData: UserData = {
  user: {
    name: "Lucas Tran",
    avatar: "user_avatar_url",
  },
  posts: [
    {
      id: 1,
      text: "Hi, this is my first post!",
      timestamp: "2023-10-11T10:00:00Z",
      comments: [
        {
          id: 1,
          author: "Nicholas Lennox",
          text: "Wow Lucas, congrats on your first post!",
          timestamp: "2023-10-11T10:30:00Z",
        },
      ],
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At risus viverra adipiscing at in tellus integer feugiat. Egestas erat imperdiet sed euismod nisi. Vitae sapien pellentesque habitant morbi. Fames ac turpis egestas maecenas. Dolor sit amet consectetur adipiscing. Vitae auctor eu augue ut lectus arcu bibendum at. Iaculis nunc sed augue lacus viverra. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Dictum varius duis at consectetur lorem donec massa sapien.",
      timestamp: "2023-10-11T10:00:00Z",
      comments: [],
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At risus viverra adipiscing at in tellus integer feugiat. Egestas erat imperdiet sed euismod nisi. Vitae sapien pellentesque habitant morbi. Fames ac turpis egestas maecenas. Dolor sit amet consectetur adipiscing. Vitae auctor eu augue ut lectus arcu bibendum at. Iaculis nunc sed augue lacus viverra. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Dictum varius duis at consectetur lorem donec massa sapien.",
      timestamp: "2023-10-11T10:00:00Z",
      comments: [
        {
          id: 1,
          author: "Babny",
          text: "Taper",
          timestamp: "2023-10-11T10:30:00Z",
        },
      ],
    },
  ],
  
};
