// ApiService.ts

import GroupData from "../interfaces/GroupData";

class ApiService {
  static getAllPostsInAGroup(arg0: number) {
    throw new Error('Method not implemented.');
  }
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchUserData() {
    try {
      const response = await fetch(`${this.baseUrl}user/lucas`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      throw new Error(`Error fetching user data: ${error}`);
    }
  }

  async getAllGroups() {
    const url = `${this.baseUrl}group`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }
  //
  async getAllPostsInAGroup(groupId: number) {
    try {
      const url = `${this.baseUrl}post/group/${groupId}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (error) {
      throw new Error(`Error fetching posts: ${error}`);
    }
  }

  async addReplyToPost(postId: number, content: string) {
    try {
      const url = `${this.baseUrl}post/${postId}/replies`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to post a reply');
      }
    } catch (error) {
      throw new Error(`Error posting a reply: ${error}`);
    }
  }

  async getAllRepliesToPost(postId: number) {
    try {
      const url = `${this.baseUrl}post/${postId}/replies`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch replies');
      }
    } catch (error) {
      throw new Error(`Error fetching replies: ${error}`);
    }
  }

  async updatePostWithReply(postId: number, newReply: string) { // Provide type annotations
    try {
      const url = `${this.baseUrl}posts/${postId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newReply }),
      });

      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        throw new Error('Failed to update post with reply');
      }
    } catch (error) {
      throw new Error(`Error updating post with reply: ${error}`);
    }
  }

  // Define a function to fetch a single user by ID
  async getUserById(id: string) {
    const url = `${this.baseUrl}/user/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  //
  // Define a function to fetch all users
  async getAllUsers() {
    const url = `${this.baseUrl}/user/list`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  async getGroupUsers(groupId: number) {
    const response = await fetch(`${this.baseUrl}group/${groupId}/user/list`);
    if (!response.ok) {
      throw new Error(`Failed to fetch group users: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }

  // Define a function to add a new user
  async addUser(id: string, name: string) {
    const url = `${this.baseUrl}/user`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  async createGroup(groupData: GroupData) {
    const url = `${this.baseUrl}/group`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create a group');
    }
  
    return response.json();
  }
  

  // Define a function to update an existing user
  async updateUser(id: string, data: any) {
    const url = `${this.baseUrl}/user/lucas`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }
}

export default ApiService;
