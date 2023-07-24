import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incPage, decPage, resetPage } from '../redux/slices/blogsSlice';

const NavButton = ({ direction }) => {
  const { page, totalPages } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const handleButton = (direction) => {
    if (direction === 'prev') {
      console.log('Previous blogs');

      page === 1 ? dispatch(resetPage(Number(totalPages))) : dispatch(decPage());

    }
    if (direction === 'next') {
      console.log('Next blogs');
      page >= totalPages ? dispatch(resetPage(1)) : dispatch(incPage());
    }
  };

  return (
    <button
      type="button"
      style={{
        height: '50px',
        with: '70px',
        alignSelf: 'center',
        padding: '10px',
        backgroundColor: '#2bcafc',
        borderRadius: '15px',
      }}
      onClick={() => handleButton(direction)}
    >
      {direction}
    </button>
  );
};

export default NavButton;
