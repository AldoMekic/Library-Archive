import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AllUsers.css';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://libraryandarchive.somee.com/api/Users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://libraryandarchive.somee.com/api/Users/deleteUser/${userId}`);
            // Filter out the user from the users array to update the UI
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <table className="all-users-table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>My Books</th>
                    <th>Comments</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.userBooks.length}</td>
                        <td>{user.userComments.length}</td>
                        <td>
                            <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AllUsers;