import { combineReducers, configureStore } from '@reduxjs/toolkit';
import blogsReducer from './slices/blogsSlice';

const rootReducer = combineReducers({
  blogs:blogsReducer
})

const store = configureStore({
  reducer: rootReducer
})
export default store
