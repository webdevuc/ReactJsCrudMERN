import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import logo from '../asserts/profile.png';

const Details = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log('getuserdata-------', getuserdata);

  const { id } = useParams('');
  console.log('id----------', id);

  const history = useHistory();

  const getSingleUser = async () => {
    try {
      const { data } = await axios.get(`/getuser/${id}`);
      setUserdata(data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const deleteuser = async (id) => {
    try {
      await axios.delete(`/deleteUser/${id}`);
      history.push('/');
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  return (
    <div className="container mt-3">
      <h2 style={{ fontWeight: 400 }}>{getuserdata.name}</h2>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${getuserdata._id}`}>
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
            </NavLink>
            <button
              className="btn btn-danger"
              onClick={() => deleteuser(getuserdata._id)}
            >
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src={logo} style={{ width: 50 }} alt="profile" />
              <h3 className="mt-3">
                Name: <span>{getuserdata.name}</span>
              </h3>
              <h3 className="mt-3">
                Age: <span>{getuserdata.age}</span>
              </h3>
              <p className="mt-3">
                <MailOutlineIcon />
                Email: <span>{getuserdata.email}</span>
              </p>
              <p className="mt-3">
                <WorkIcon />
                Occuption: <span>{getuserdata.work}</span>
              </p>
            </div>
            <div className="right_view  col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <PhoneAndroidIcon />
                mobile: <span>+91 {getuserdata.mobile}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon />
                location: <span>{getuserdata.add}</span>
              </p>
              <p className="mt-3">
                Description: <span>{getuserdata.desc}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <button
        className="btn btn-primary mt-3"
        onClick={() => {
          history.push('/');
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Details;
