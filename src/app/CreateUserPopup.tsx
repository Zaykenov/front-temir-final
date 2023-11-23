// CreateUserPopup.tsx
import React from 'react';

interface CreateFormData {
  user_id: number;
  email: string;
  given_name: string;
  last_name: string;
  city: string;
  phoneNumber: string;
  description: string;
  password: string;
}

interface CreateUserPopupProps {
    createFormData: CreateFormData;
    setCreateFormData: React.Dispatch<React.SetStateAction<CreateFormData>>;
    handleCreateUser: () => void;
    isCreatePopupOpen: boolean;
    setCreatePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    inputStyle: React.CSSProperties;
  warning: string;
  setWarning: React.Dispatch<React.SetStateAction<string>>;
  successMessage: string;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const CreateUserPopup: React.FC<CreateUserPopupProps> = ({
    createFormData,
    setCreateFormData,
    handleCreateUser,
    isCreatePopupOpen,
    setCreatePopupOpen,
    inputStyle,
    warning,  // Destructure warning
    setWarning,  // Destructure setWarning
    successMessage,
    setSuccessMessage,
}) => {
  return (
    <>
  {isCreatePopupOpen && (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-black opacity-50 fixed inset-0"></div>
      <div className="bg-white p-6 rounded shadow-md z-20">
        <h2 className="text-2xl font-bold mb-4 text-black">Create User</h2>
        <div className="mb-2">
          <label htmlFor="createUserId" className="text-black">User ID:</label>
          <input
            type="number"
            id="createUserId"
            className="input-field w-full border border-gray-300 p-2 rounded"
            style={inputStyle}
            value={createFormData.user_id || ''}
            onChange={(e) => setCreateFormData({ ...createFormData, user_id: Number(e.target.value) })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="createEmail" className="text-black">Email:</label>
          <input
            type="text"
            id="createEmail"
            className="input-field w-full border border-gray-300 p-2 rounded"
            style={inputStyle}
            value={createFormData.email || ''}
            onChange={(e) => setCreateFormData({ ...createFormData, email: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="createGivenName" className="text-black">Given Name:</label>
          <input
            type="text"
            id="createGivenName"
            className="input-field w-full border border-gray-300 p-2 rounded"
            style={inputStyle}
            value={createFormData.given_name || ''}
            onChange={(e) => setCreateFormData({ ...createFormData, given_name: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="createLastName" className="text-black">Last Name:</label>
          <input
            type="text"
            id="createLastName"
            className="input-field w-full border border-gray-300 p-2 rounded"
            style={inputStyle}
            value={createFormData.last_name || ''}
            onChange={(e) => setCreateFormData({ ...createFormData, last_name: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="createCity" className="text-black">City:</label>
          <input
            type="text"
            id="createCity"
            className="input-field w-full border border-gray-300 p-2 rounded"
            style={inputStyle}
            value={createFormData.city || ''}
            onChange={(e) => setCreateFormData({ ...createFormData, city: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="createPhoneNumber" className="text-black">Phone Number:</label>
          <input
            type="text"
            id="createPhoneNumber"
            className="input-field w-full border border-gray-300 p-2 rounded"
            style={inputStyle}
            value={createFormData.phoneNumber || ''}
            onChange={(e) => setCreateFormData({ ...createFormData, phoneNumber: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="createDescription" className="text-black">Description:</label>
          <input
            type="text"
            id="createDescription"
            className="input-field w-full border border-gray-300 p-2 rounded"
            style={inputStyle}
            value={createFormData.description || ''}
            onChange={(e) => setCreateFormData({ ...createFormData, description: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="createPassword" className="text-black">Password:</label>
          <input
            type="password"
            id="createPassword"
            className="input-field w-full border border-gray-300 p-2 rounded"
            style={inputStyle}
            value={createFormData.password || ''}
            onChange={(e) => setCreateFormData({ ...createFormData, password: e.target.value })}
          />
        </div>
        {/* ... (repeat for other input fields) */}
        <div className="flex justify-center mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleCreateUser}
          >
            Create
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setCreatePopupOpen(false);
              setWarning('');
            }}
          >
            Cancel
          </button>
        </div>
        {warning && <p className="text-red-500 mt-2">{warning}</p>}
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      </div>
    </div>
  )}
</>

  );
};

export default CreateUserPopup;
