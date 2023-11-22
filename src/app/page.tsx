"use client"

import { useState } from 'react';

interface User {
  user_id: number;
  // add other fields as needed
}

export default function Home() {
  const [userId, setUserId] = useState<number>(1); // Default user ID for demonstration

  const handleGetUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/user/${userId}`);
      const userData: User = await response.json();
      console.log(userData);
      // Handle the retrieved user data as needed
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleCreateUser = async () => {
    // Implement the logic for creating a user
  };

  const handleModifyUser = async () => {
    // Implement the logic for modifying a user
  };

  const handleDeleteUser = async () => {
    // Implement the logic for deleting a user
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h2 className="text-2xl font-bold mb-4">THE_USER table</h2>
        <div className="flex mb-4">
          <label htmlFor="userId" className="mr-2">
            User ID:
          </label>
          <input
            type="number"
            id="userId"
            className="border border-gray-300 p-1 rounded"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
          />
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            onClick={handleGetUser}
          >
            Get
          </button>
        </div>
        <div className="flex">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleCreateUser}
          >
            Create
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleModifyUser}
          >
            Change
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={handleDeleteUser}
          >
            Delete
          </button>
        </div>
      </div>
    </main>
  );
}
