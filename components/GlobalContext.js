// GlobalContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    id: '',
    password: '',
    countryCode: '',
    preference: '',
  });
  const [acceptedChats, setAcceptedChats] = useState([]);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState(new Set());
  const [groupName, setGroupName] = useState('');

  // Function to update user data
  const updateUserData = (newData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const updateSelectedGroupMembers = (memberIds, action = 'add') => {
    setSelectedGroupMembers(prevMembers => {
      const newMembers = new Set(prevMembers);
      if (action === 'add') {
        memberIds.forEach(id => newMembers.add(id));
      } else if (action === 'remove') {
        memberIds.forEach(id => newMembers.delete(id));
      } else if (action === 'clear') {
        newMembers.clear();
      }
      return newMembers;
    });
  };

  return (
    <GlobalContext.Provider value={{ userData, updateUserData, acceptedChats, setAcceptedChats, selectedGroupMembers, updateSelectedGroupMembers, groupName, setGroupName }}>
      {children}
    </GlobalContext.Provider>
  );
};