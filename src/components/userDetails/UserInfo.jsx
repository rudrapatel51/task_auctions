import React, { useState, useEffect } from 'react';
import axios from '../../api/Axios';

const UserInfo = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`https://dev-api.jpauction.in/api/v1/client/buyer/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error.response || error.message);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white shadow rounded-lg dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Information</h2>
      <p><strong>Mobile:</strong> {user.mobile}</p>
      
    </div>
  );
};

export default UserInfo;
