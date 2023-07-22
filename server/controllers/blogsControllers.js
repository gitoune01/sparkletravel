import Blogs from '../models/BlogsSchema.js';

export const createBlog = async (req, res) => {
  res.status(200).json('hit create end point');
};
export const getBlogbycat = async (req, res) => {
 console.log(req.query)
 
  const blogs = await Blogs.find({});

  res.status(200).json(blogs);
};
// export const createBlog = (req, res) => {
//   res.send('hit create end point');
// };
// export const createBlog = (req, res) => {
//   res.send('hit create end point');
// };
// export const createBlog = (req, res) => {
//   res.send('hit create end point');
// };
