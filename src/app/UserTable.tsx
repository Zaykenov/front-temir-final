// UserTable.tsx
import React from 'react';

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

interface UserTableProps {
  userId: number | string;
  setUserId: React.Dispatch<React.SetStateAction<number | string>>;
  warning: string;
  setWarning: React.Dispatch<React.SetStateAction<string>>;
  successMessage: string;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  isCreatePopupOpen: boolean;
  setCreatePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleGetUser: () => void;
  handleDeleteUser: () => void;
  inputStyle: React.CSSProperties;
}

const UserTable: React.FC<UserTableProps> = ({
  userId,
  setUserId,
  warning,
  setWarning,
  successMessage,
  setSuccessMessage,
  userData,
  setUserData,
  isCreatePopupOpen,
  setCreatePopupOpen,
  handleGetUser,
  handleDeleteUser,
  inputStyle,
}) => {
  return (
    <div className="mt-1 mb-1 z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {userData && (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">User Data:</h3>
            <table className="table-auto border border-collapse border-gray-500">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">User ID:</td>
                  <td className="border px-4 py-2 font-semibold">Email:</td>
                  <td className="border px-4 py-2 font-semibold">First Name:</td>
                  <td className="border px-4 py-2 font-semibold">Last Name:</td>
                  <td className="border px-4 py-2 font-semibold">City:</td>
                  <td className="border px-4 py-2 font-semibold">Phone Number:</td>
                  <td className="border px-4 py-2 font-semibold">Description:</td>
                  <td className="border px-4 py-2 font-semibold">Password:</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">{userData.user_id}</td>
                  <td className="border px-4 py-2">{userData.email}</td>
                  <td className="border px-4 py-2">{userData.first_name}</td>
                  <td className="border px-4 py-2">{userData.last_name}</td>
                  <td className="border px-4 py-2">{userData.city}</td>
                  <td className="border px-4 py-2">{userData.phoneNumber}</td>
                  <td className="border px-4 py-2">{userData.description}</td>
                  <td className="border px-4 py-2">{userData.password}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default UserTable;
