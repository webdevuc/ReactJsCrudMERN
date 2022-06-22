import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addData } from './context/ContextProvider';
import axios from 'axios';

const Register = () => {
  const { setAddUser } = useContext(addData);

  const history = useHistory();

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
    // console.log(e.target.value);

    setInputValue((preValue) => {
      return {
        ...preValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: inputValue.name,
      email: inputValue.email,
      work: inputValue.work,
      add: inputValue.add,
      mobile: inputValue.mobile,
      desc: inputValue.desc,
      age: inputValue.age,
    };

    try {
      const data = await axios.post('/adduser', payload);
      setAddUser(data);
      history.push('/');
    } catch (error) {
      console.log('Error ', error.message);
    }
  };

  return (
    <div className="container">
      <h4 className="mt-4">Add user</h4>
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-12 col-lg-6 col-md-6 ">
            <label htmlFor="exampleInputEmail1" className="form-label">
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
            <label htmlFor="exampleInputPassword1" className="form-label">
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
            <label htmlFor="exampleInputPassword1" className="form-label">
              Age
            </label>
            <input
              type="number"
              value={inputValue.age}
              onChange={handleChange}
              name="age"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
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
            <label htmlFor="exampleInputPassword1" className="form-label">
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
            <label htmlFor="exampleInputPassword1" className="form-label">
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
            <label htmlFor="exampleInputPassword1" className="form-label">
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
            onClick={handleSubmit}
            className="btn btn-primary mb-2 w-90"
          >
            Submit
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
export default Register;
