import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { updateData } from './context/ContextProvider';
import axios from 'axios';

const Edit = () => {
  const { setUpdateUser } = useContext(updateData);

  const history = useHistory('');

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    age: '',
    mobile: '',
    work: '',
    add: '',
    desc: '',
  });

  const handleChange = (e) => {
    console.log('inputValue------', e.target.value);

    setInputValue((preValue) => {
      return {
        ...preValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const { id } = useParams('');

  const getData = async () => {
    try {
      const { data } = await axios.get(`/getuser/${id}`);
      setInputValue(data);
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const { name, email, work, add, mobile, desc, age } = inputValue;

      const payload = {
        name,
        email,
        work,
        add,
        mobile,
        desc,
        age,
      };
      const data = await axios.put(`/updateuser/${id}`, payload);
      // console.log(data);

      setUpdateUser(data);
      history.push('/');
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  return (
    <div className="container">
      <h3 className="mt-4">Update user</h3>
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={inputValue.name}
              onChange={handleChange}
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={inputValue.email}
              onChange={handleChange}
              name="email"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Age
            </label>
            <input
              type="text"
              value={inputValue.age}
              onChange={handleChange}
              name="age"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              value={inputValue.mobile}
              onChange={handleChange}
              name="mobile"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Work
            </label>
            <input
              type="text"
              value={inputValue.work}
              onChange={handleChange}
              name="work"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={inputValue.add}
              onChange={handleChange}
              name="add"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              name="desc"
              value={inputValue.desc}
              onChange={handleChange}
              className="form-control"
              id=""
              cols="30"
              rows="5"
            />
          </div>

          <button
            type="submit"
            onClick={updateUser}
            className="btn btn-primary mb-2"
          >
            Update
          </button>
          <button
            type="submit"
            onClick={() => history.push('/')}
            className="btn btn-danger"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
