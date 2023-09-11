const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Get a single thought
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(course);
      } catch (err) {
        res.status(500).json(err);
      }
    }

}