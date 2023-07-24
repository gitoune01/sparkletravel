import Blogs from '../models/BlogsSchema.js';

export const createBlog = async (req, res) => {
  res.status(200).json('hit create end point');
};
export const getBlogbycat = async (req, res) => {
  const { category, page } = req.params;
  const queryObject = {};

  const limit = 2;
  const skip = (page - 1) * limit;
  // const increment = Number(page) + 4; //skip(offset)
  console.log('PARAMSReq', category, page);
  console.log('PARAMS', limit, skip);

  try {
    if (category === 'all') {
      const blogs = await Blogs.find({}).limit(limit).skip(skip);
      const totalBlogs = await Blogs.countDocuments(queryObject);
      const numOfPages = Math.ceil(totalBlogs / limit);
      res.status(200).json({ blogs, numOfPages, page });
    } else if (category === 'latest') {
      const blogs = await Blogs.find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);
      const totalBlogs = await Blogs.countDocuments(queryObject);
      const numOfPages = Math.ceil(totalBlogs / limit);

      res.status(200).json({ blogs, numOfPages, page });
    } else {
      const blogs = await Blogs.find({ category }).limit(limit).skip(skip);
      // const totalBlogs = await Blogs.countDocuments(queryObject({ category}));
      const numOfPages = Math.ceil(blogs.length / limit);
      res.status(200).json({ blogs, numOfPages, page });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blogs.findById(id);
    if (!blog) {
      res.status(404).json({ message: 'no id provided' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
  }

};
