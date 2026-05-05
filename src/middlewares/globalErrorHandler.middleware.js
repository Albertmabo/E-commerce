const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  // for dev

  const devErrors = (res, error) => {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stackTrace: error.stack,
      error: error,
    });
  };

  // for prod

  const prodError = (res, error) => {
    // send this if the error is operational error
    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }else{
      res.status(500).json({
        status: "error",
        message:"Somthing whent wrong please try again later"
      })
    }

  };
  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    prodError(res, error);
  }
};

export default globalErrorHandler;
