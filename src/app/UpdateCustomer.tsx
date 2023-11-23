"use client"

import React, { useState, ChangeEvent } from 'react';

// Define the structure of the form data using TypeScript interfaces
interface FormData {
  city: string;
  email: string;
  given_name: string;
  password: string;
  phone_number: string;
  profile_description: string;
  surname: string;
  user_id: number;
}

interface UpdateCustomerProps {
    setUpdatePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

// Define a React functional component named UpdateCustomer
const UpdateCustomer: React.FC<UpdateCustomerProps> = ({ setUpdatePopupOpen }) => {
  // Use the useState hook to manage the state of the form data
  const [formData, setFormData] = useState<FormData>({
    city: '',
    email: '',
    given_name: '',
    password: '',
    phone_number: '',
    profile_description: '',
    surname: '',
    user_id: 0, // Initialize with 0 or an empty value
  });

  // Define a function to handle input changes in the form
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Extract the name and value from the input element
    const { name, value } = e.target;
    // Update the form data state using the previous state (prevData)
    // and spreading its properties, then updating the specific property (name) with the new value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Define a function to handle the update action
  const handleUpdate = async () => {
    try {
      // Filter out properties with empty values
      const filteredData: any = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== '') {
          filteredData[key] = value;
        }
      });

      // Make a PUT request to update the customer data on the server
      const response = await fetch(`https://flasker485-157431734465.herokuapp.com/api/customer/${formData.user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // Convert the filtered data to JSON and send it in the request body
        body: JSON.stringify(filteredData),
      });

      // Check if the response is not successful and throw an error if needed
      if (!response.ok) {
        throw new Error('Failed to update customer');
      }

      // Log a success message if the customer is updated successfully
      console.log('Customer updated successfully');
      setUpdatePopupOpen(false);
    } catch (error: any) {
      // Log an error message if there's an error during the update process
      console.error('Error updating customer:', error.message);
    }
  };

  // Render the form with input fields and an update button
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4  text-gray-700">Update Customer</h2>
  
      {/* Input field for User ID */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="userId">
          User ID:
        </label>
        <input
          className="w-full border border-gray-300 p-2 rounded"
          type="number"
          name="user_id"
          value={formData.user_id}
          onChange={handleInputChange}
          style={{ color: 'black' }}
        />
      </div>
  
      {/* Input fields for other properties */}
      {(['city', 'email', 'given_name', 'surname', 'phone_number', 'profile_description', 'password'] as Array<keyof FormData>).map((property) => (
        <div key={property} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={property}>
            {property.charAt(0).toUpperCase() + property.slice(1).replace('_', ' ')}:
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            style={{ color: 'black' }}
            value={formData[property]}
            onChange={handleInputChange}
            name = {property}
          />
        </div>
      ))}
  
      {/* Button to trigger the update action */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleUpdate}
        >
          Update Customer
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setUpdatePopupOpen(false)}
        >
          Cancel
        </button>
      </div>
      
    </div>
  );
  
};

// Export the UpdateCustomer component as the default export of this module
export default UpdateCustomer;

