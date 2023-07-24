import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  blogs: [],
  blog: null,
  loading: false,
  error: null,
  page: 1,
  totalPages: 0,
  status: 200,
  updateButtonLoading: false,
  blogCreated: false,
  blogUpdated: false,
  blogRemoved: false,
};

//api
//get blogs

export const getBlogByCat = createAsyncThunk(
  'blogs/getBlogs',
  async ({ category, page }) => {
    console.log('PAGEAXIOS=======================>: ' + page);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/blogs/getblogbycat/${category}/${page}`
      );

      console.log('DATA=======>', data);

      return data;
    } catch (err) {
      return {
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
            ? err.message
            : 'An unexpected error occurred',
      };
    }
  }
);

export const getSingleBlog = createAsyncThunk('blogs/getBlog', async ({ id }) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/blogs/getsingleblog/${id}`
    );

    return data;
  } catch (err) {
    return {
      message:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
          ? err.message
          : 'An unexpected error occurred',
    };


  }
});
const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBlogByCategory: (state, action) => {
      state.blogs = action.payload.blogs;
      state.loading = false;
      state.error = null;
    },
    incPage: (state, action) => {
      state.page += 1;
    },
    decPage: (state, action) => {
      state.page -= 1;
    },
    resetPage: (state, action) => {
      state.page = action.payload;
    },
    setBlog: (state, action) => {
      state.blog = action.payload;
      state.loading = false;
      state.error = null;
    },
    blogUpdated: (state, action) => {
      state.blogUpdated = action.payload;
      state.loading = false;
      state.error = null;
    },
    blogCreated: (state, action) => {
      state.blogCreated = action.payload;
      state.loading = false;
      state.error = null;
    },
    blogRemoved: (state, action) => {
      state.blogRemoved = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUpdateButtonLoading: (state, action) => {
      state.updateButtonLoading = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.buttonLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBlogByCat.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBlogByCat.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = action.payload.blogs;
      state.page = Number(action.payload.page);
      state.totalPages = action.payload.numOfPages;
    });
    builder.addCase(getBlogByCat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    ///////////////////////////////////////////////////////////////
    builder.addCase(getSingleBlog.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSingleBlog.fulfilled, (state, action) => {
      state.blog = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getSingleBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  setLoading,
  setBlogByCategory,
  setBlog,
  blogUpdated,
  blogCreated,
  blogRemoved,
  setUpdateButtonLoading,
  setError,
  incPage,
  decPage,
  resetPage,
} = blogsSlice.actions;
export default blogsSlice.reducer;
