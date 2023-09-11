const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const headCount = async () => {
    const numberOfUsers = await User.aggregate()
      .count('userCount');
    return numberOfUsers;
  };
// Get all users
module.exports = {
 async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        headCount: await headCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// Get a single user
async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }
//unsure of this part?
      res.json({
        user,
        grade: await grade(req.params.userId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// create a new user
async createUser(req, res) {
    try {
      const student = await User.create(req.body);
      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },
 // Update a user
 async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// Delete a user and remove them from the database
async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.studentId });

      if (!student) {
        return res.status(404).json({ message: 'No such student exists' });
      }
      res.json({ message: 'Student successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
}
