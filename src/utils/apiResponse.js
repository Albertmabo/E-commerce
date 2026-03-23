const sendResponse = (res, message, data = null, statusCode = 200, noOfItem = null) => {
  let responseBody = {
    success: true,
    message,
    
  };

  if (data) responseBody.data = data;
  if(noOfItem) responseBody.noOfItem = noOfItem;

  console.log(message, noOfItem);
  
  
  res.status(statusCode).json(responseBody);
};

const sendAuthResponse = (res, messa) => {};

export { sendResponse, sendAuthResponse };
