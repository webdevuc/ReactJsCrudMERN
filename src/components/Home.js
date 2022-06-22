import React, { useState, useEffect, useContext } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { addData, deleteData, updateData } from './context/ContextProvider';

import axios from 'axios';

const Home = () => {
  const [userData, setUserData] = useState([]);
  console.log('userData--------', userData);

  const { addUser } = useContext(addData);

  const { updateUser } = useContext(updateData);

  const { deleteUser, setDeleteUser } = useContext(deleteData);

  const getdata = async () => {
    try {
      const { data } = await axios.get('/getallusers');
      setUserData(data);
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    try {
      const deleteUser = await axios.delete(`/deleteuser/${id}`);
      console.log('DELETE------', deleteUser);
      setDeleteUser(deleteUser);
      getdata();
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  return (
    <>
      {addUser && (
        <>
          <div
            className="alert alert-success alert-dismissible fade show container mt-3"
            role="alert"
          >
            User added succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            />
          </div>
        </>
      )}
      {updateUser && (
        <>
          <div
            className="alert alert-success alert-dismissible fade show container mt-3"
            role="alert"
          >
            User updated succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            />
          </div>
        </>
      )}

      {deleteUser && (
        <>
          <div
            className="alert alert-danger alert-dismissible fade show container mt-3"
            role="alert"
          >
            User deleted succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      )}

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/register" className="btn btn-primary">
              Add data
            </NavLink>
          </div>

          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, id) => {
                return (
                  <>
                    <tr key={id}>
                      <th scope="row">{id + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.work}</td>
                      <td>{user.mobile}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`view/${user._id}`}>
                          <button className="btn btn-success">
                            <RemoveRedEyeIcon />
                          </button>
                        </NavLink>
                        <NavLink to={`edit/${user._id}`}>
                          <button className="btn btn-primary">
                            <CreateIcon />
                          </button>
                        </NavLink>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteuser(user._id)}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
