const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('DB Connected...'))
  .catch((error) => console.log(error.message));
