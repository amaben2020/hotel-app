export const createError = (message, statusCode) => {
  const error = new Error();
  error.stack = statusCode;
  return error;
};
