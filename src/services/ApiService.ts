// ApiService.ts
class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchUserData() {
    try {
      const response = await fetch(`${this.baseUrl}user/9e8ae4c6-7901-4ce3-b562-395fc411e006`);
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

  // Define a function to update an existing user
  async updateUser(id: string, data: any) {
    const url = `${this.baseUrl}/user/${id}`;
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
