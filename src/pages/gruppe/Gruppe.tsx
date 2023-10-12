import React, { useState } from 'react';

// Define interfaces for group and post
interface Group {
    id: number;
    name: string;
    description: string;
}

interface Post {
    id: number;
    groupId: number;
    content: string;
}

const App: React.FC = () => {
    // State for groups and posts
    const [groups, setGroups] = useState<Group[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

    // Function to create a group
    const createGroup = (name: string, description: string) => {
        const newGroup: Group = {
            id: groups.length + 1,
            name,
            description,
        };
        setGroups([...groups, newGroup]);
    };

    // Function to create a post
    const createPost = (content: string) => {
        if (selectedGroupId !== null) {
            const newPost: Post = {
                id: posts.length + 1,
                groupId: selectedGroupId,
                content,
            };
            setPosts([...posts, newPost]);
        }
    };

    return (
        <div className="App">
            <div className="group-management">
                <h2>Create or Edit Group</h2>
                <input type="text" placeholder="Group Name" />
                <textarea placeholder="Group Description" />
                <button onClick={() => createGroup("Group Name", "Group Description")}>
                    Create Group
                </button>
            </div>

            <div className="group-list">
                <h2>Group List</h2>
                <ul>
                    {groups.map((group) => (
                        <li key={group.id}>
                            <span>{group.name}</span>
                            <button onClick={() => setSelectedGroupId(group.id)}>Select</button>
                        </li>
                    ))}
                </ul>
            </div>

            {selectedGroupId !== null && (
                <div className="group-detail">
                    <h2>Group Detail</h2>
                    <button onClick={() => setSelectedGroupId(null)}>Back to Group List</button>
                    <h3>Selected Group: {groups.find((group) => group.id === selectedGroupId)?.name}</h3>
                    <textarea placeholder="New Post Content" />
                    <button onClick={() => createPost("New Post Content")}>Create Post</button>
                    <ul>
                        {posts
                            .filter((post) => post.groupId === selectedGroupId)
                            .map((post) => (
                                <li key={post.id}>{post.content}</li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;
