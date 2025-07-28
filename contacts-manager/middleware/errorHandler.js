const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging and mitoonid error ro see conid 

  if (res.headersSent) {
    return next(err);
  }

  
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Server Error';

  // For this simple setup, we primarily catch generic errors or those we explicitly throw
  // You can add more specific error handling if you introduce custom error classes later

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler;