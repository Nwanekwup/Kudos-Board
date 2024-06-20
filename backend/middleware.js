function  validateBody(req, res, next) {
    // if (!req.headers["some-key"]) {
    //   console.log("Invalid request");
    //   return;
    // }
    console.log("Inside Middleware");
    next();
}
  
module.exports =  {validateBody};