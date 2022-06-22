import React, { createContext, useState } from 'react';

export const addData = createContext('');
export const updateData = createContext('');
export const deleteData = createContext('');

const ContextProvider = ({ children }) => {
  const [addUser, setAddUser] = useState('');
  const [updateUser, setUpdateUser] = useState('');
  const [deleteUser, setDeleteUser] = useState('');

  return (
    <addData.Provider value={{ addUser, setAddUser }}>
      <updateData.Provider value={{ updateUser, setUpdateUser }}>
        <deleteData.Provider value={{ deleteUser, setDeleteUser }}>
          {children}
        </deleteData.Provider>
      </updateData.Provider>
    </addData.Provider>
  );
};

export default ContextProvider;
