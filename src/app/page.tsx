"use client"

import React, { useState, useEffect } from 'react';
import UserTable from './UserTable';
import CreateUserPopup from './CreateUserPopup';
import UpdateCustomer from './UpdateCustomer';


interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  phoneNumber: string;
  description: string;
  password: string;
}

interface createFormData {
  user_id: number;
  email: string;
  given_name: string;
  last_name: string;
  city: string;
  phoneNumber: string;
  description: string;
  password: string;
}

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [userId, setUserId] = useState<number | string>('');
  const [warning, setWarning] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [userData, setUserData] = useState<User | null>(null);
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  
  // Initialize createFormData
  const [createFormData, setCreateFormData] = useState<createFormData>({
    user_id: 0,
    email: '',
    given_name: '',
    last_name: '',
    city: '',
    phoneNumber: '',
    description: '',
    password: '',
  });
  const UpdateCustomerComponent = (
    <UpdateCustomer setUpdatePopupOpen={setUpdatePopupOpen} />
  );


  useEffect(() => {
    setWarning('');
  }, [userId]);
  const handleGetUser = async () => {
    try {
      if (!userId) {
        setWarning('User ID cannot be empty.');
        return;
      }

      const response = await fetch(`https://flasker485-157431734465.herokuapp.com/api/customer/${userId}`);

      if (!response.ok) {
        console.error('Error fetching user data. Status:', response.status);
        setWarning('Error fetching user data.');
        return;
      }

      const responseData = await response.json();

      if (responseData && responseData.customers && Array.isArray(responseData.customers)) {
        const [customer] = responseData.customers;

        const userData: User = {
          user_id: customer.user_id,
          email: customer.email,
          first_name: customer.given_name,
          last_name: customer.surname,
          city: customer.city,
          phoneNumber: customer.phone_number,
          description: customer.profile_description,
          password: customer.password,
        };

        setUserData(userData);
        setWarning('');
      } else {
        console.error('Invalid response format:', responseData);
        setWarning('Invalid response format.');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleCreateUser = async () => {
    for (const key in createFormData) {
      if (!createFormData[key as keyof typeof createFormData]) {
        setWarning('All fields in the create popup must be filled.');
        return;
      }
    }

    try {
      const response = await fetch('https://flasker485-157431734465.herokuapp.com/api/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: createFormData.user_id,
          email: createFormData.email,
          given_name: createFormData.given_name,
          surname: createFormData.last_name,
          city: createFormData.city,
          phone_number: createFormData.phoneNumber,
          profile_description: createFormData.description,
          password: createFormData.password,
        }),
      });

      if (!response.ok) {
        console.error('Error creating user. Status:', response.status);
        setWarning('Error creating user.');
        return;
      }

      setCreateFormData({
        user_id: 0,
        email: '',
        given_name: '',
        last_name: '',
        city: '',
        phoneNumber: '',
        description: '',
        password: '',
      });

      setCreatePopupOpen(false);
      setWarning('');
      setSuccessMessage('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (!userId) {
        setWarning('User ID cannot be empty.');
        return;
      }

      const response = await fetch(`https://flasker485-157431734465.herokuapp.com/api/customer/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Error deleting user. Status:', response.status);
        setWarning('Error deleting user.');
        return;
      }

      setUserId('');
      setWarning('');
      setSuccessMessage('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const inputStyle = {
    color: 'black',
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mt-1 mb-1 z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h2 className="text-2xl font-bold mb-4">THE_USER table</h2>
        <div className="flex mb-4">
          <label htmlFor="userId" className="mr-2">
            User ID:
          </label>
          <input
            type="number"
            id="userId"
            className="border border-gray-300 p-1 rounded"
            style={inputStyle}
            value={userId}
            onChange={(e) => {
              setUserId(Number(e.target.value));
              setWarning('');
            }}
          />
          <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={handleGetUser}>
            Read
          </button>
        </div>
        <div className="flex">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setCreatePopupOpen(true)}
          >
            Create
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setUpdatePopupOpen(true)}
          >
            Update
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleDeleteUser}>
            Delete
          </button>
        </div>
      </div>
      {isUpdatePopupOpen && <UpdateCustomer setUpdatePopupOpen={setUpdatePopupOpen} />}
      <div>{warning && <p className="text-red-500 mt-2">{warning}</p>}</div>
      <UserTable
        userId={userId}
        setUserId={setUserId}
        warning={warning}
        setWarning={setWarning}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        userData={userData}
        setUserData={setUserData}
        isCreatePopupOpen={isCreatePopupOpen}
        setCreatePopupOpen={setCreatePopupOpen}
        handleGetUser={handleGetUser}
        handleDeleteUser={handleDeleteUser}
        inputStyle={inputStyle}
      />
<CreateUserPopup
  createFormData={createFormData}
  setCreateFormData={setCreateFormData}
  handleCreateUser={handleCreateUser}
  isCreatePopupOpen={isCreatePopupOpen}
  setCreatePopupOpen={setCreatePopupOpen}
  inputStyle={inputStyle}
  warning={warning}
  setWarning={setWarning} 
  successMessage={successMessage} 
  setSuccessMessage={setSuccessMessage}  
/>
    </main>
  );
};
export default Home;