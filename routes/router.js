const User = require('../models/userSchema.js');

exports.serverRoute = async (req, res) => {
  res.status(200).json({ message: 'Server is running...' });
};

// Add user
exports.addUser = async (req, res) => {
  console.log(req.body);
  const { name, email, age, mobile, work, add, desc } = req.body;

  try {
    const isUserExit = await User.findOne({ email });
    console.log(isUserExit);

    if (isUserExit) {
      res.status(422).json({ message: 'User already exists' });
    } else {
      const adduser = new User({
        name,
        email,
        age,
        mobile,
        work,
        add,
        desc,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
};

// get userdata
exports.getUsers = async (req, res) => {
  try {
    const userdata = await User.find();
    res.status(200).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const _id = req.params.id;

    console.log('id---', _id);
    const singleUser = await User.findById({ _id });

    console.log(singleUser);
    res.status(201).json(singleUser);
  } catch (error) {
    res.status(422).json(error);
  }
};

// update user data
exports.updateUset = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updatedUser);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(422).json(error);
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    await User.findByIdAndRemove({ _id });

    res.status(201).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(422).json(error);
  }
};
