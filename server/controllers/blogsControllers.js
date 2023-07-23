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

  //get params
  // const { category, page } = req.query;
  // console.log(req.query);
  // let catFilter = {};
  // if ((category === 'all' || category === '')) {
  //   catFilter = {};
  // } else {
  //   catFilter = {
  //     category: { $eq: category },
  //   };

  // }
  // const page = page || 1;
  // const limit = 4; // max number of elements to return/page
  // const skip = (page - 1) * limit; //offset => actual chunk of elements to return to match the requested page

  // //  const blogs = await Blogs.find(category!==''? {category:{$eq:category}}:{}).skip(skip).limit(limit)
  // const blogs = await Blogs.find(catFilter);
  // res.status(200).json(blogs);
  //  const blogs = await Blogs.find({category:{$eq:category}}).select('-contentOne -image');
  // const queryObject = {};
  // const totalBlogs = await Blogs.countDocuments(queryObject);
  // const numOfPages = Math.ceil(totalBlogs / limit);
  // res.status(200).json({
  //   blogs,
  //   nbofBlogs: blogs.length,
  //   totalBlogs,
  //   numOfPages,
  //   page,
  // });
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
