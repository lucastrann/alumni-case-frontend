import GroupData from "../interfaces/GroupData";
import KeycloakService from "./KeycloakService";

class ApiService {
  private baseUrl: string;
  private authToken: string; 

  constructor(baseUrl: string, authToken: string) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }

  private createHeaders() {
    return {
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    };
  }

  async fetchUserData() {
    try {
      const response = await fetch(`${this.baseUrl}users/current`, {
        headers: this.createHeaders(),
      });
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
    const response = await fetch(url, {
      headers: this.createHeaders(),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  async getAllPostsInAGroup(groupId: number) {
    try {
      const url = `${this.baseUrl}posts/group/${groupId}`;
      const response = await fetch(url, {
        headers: this.createHeaders(),
      });
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

  async getAllPosts(groupId: number) {
    try {
      const url = `${this.baseUrl}posts/group/${groupId}`;
      const response = await fetch(url, {
        headers: this.createHeaders(),
      });
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
    const url = `${this.baseUrl}posts/${postId}/replies`;

    const options = {
      method: 'POST',
      headers: this.createHeaders(),
      body: JSON.stringify({ content: content }),
    };

    try {
      const response = await fetch(url, options);
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
      const url = `${this.baseUrl}posts/${postId}/replies`;
      const response = await fetch(url, {
        headers: this.createHeaders(),
      });
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

  async updatePostWithReply(postId: number, newReply: string) {
    try {
      const url = `${this.baseUrl}posts/${postId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: this.createHeaders(),
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

  async getUserById(id: string) {
    const url = `${this.baseUrl}/users/${id}`;
    const response = await fetch(url, {
      headers: this.createHeaders(),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  async getAllUsers() {
    const url = `${this.baseUrl}/users/list`;
    const response = await fetch(url, {
      headers: this.createHeaders(),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  async getGroupUsers(groupId: number) {
    const response = await fetch(`${this.baseUrl}group/${groupId}/user/list`, {
      headers: this.createHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch group users: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }

  async addUser(id: string, name: string) {
    const url = `${this.baseUrl}/users`;
    const response = await fetch(url, {
      method: 'POST',
      headers: this.createHeaders(),
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
      headers: this.createHeaders(),
      body: JSON.stringify(groupData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create a group');
    }
  
    return response.json();
  }

  async updateUser(id: string, data: any) {
    const url = `${this.baseUrl}users/${KeycloakService.getUserId()}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.createHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}

export default ApiService;
