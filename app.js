const express = require('express');
require('dotenv').config();
const cors = require('cors');

require('./db/conn');
const {
  serverRoute,
  getUsers,
  getSingleUser,
  deleteUser,
  addUser,
  updateUset,
} = require('./routes/router');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', serverRoute);
app.post('/adduser', addUser);
app.get('/getallusers', getUsers);
app.get('/getuser/:id', getSingleUser);
app.put('/updateuser/:id', updateUset);
app.delete('/deleteuser/:id', deleteUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
