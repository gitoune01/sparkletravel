import mongoose from 'mongoose';

const blogsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  contentOne: {
    type: String,
    required: true,
  },
  contentTwo: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
},{
  timestamps:true
});

export default mongoose.model('Blogs', blogsSchema);
