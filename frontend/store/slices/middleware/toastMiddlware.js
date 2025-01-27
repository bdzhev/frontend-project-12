import { toast } from 'react-toastify';
import {
  isFulfilled, isPending, isRejectedWithValue, Middleware,
} from '@reduxjs/toolkit';

const toastMiddleware = () => (next) => (action) => {
  const TOAST_ID = 'query_status';
  if (isPending(action)) {
    toast.loading('Loading ...', { toastId: TOAST_ID });
  } else if (isFulfilled(action)) {
    toast.update(TOAST_ID, {
      render: 'Success!',
      type: 'success',
      isLoading: false,
      autoClose: 3000,
    });
  } else if (isRejectedWithValue(action)) {
    toast.update(TOAST_ID, {
      render: 'Error occured!',
      type: 'Error',
      isLoading: false,
      autoClose: 3000,
    });
  }

  return next(action);
};

export default toastMiddleware;
