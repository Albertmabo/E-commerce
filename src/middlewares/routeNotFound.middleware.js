import CustomError from "./CustomError.js"

const routeNotFound = ((req,res,next)=>{
    throw new CustomError(`Cannot find route ${req.originalUrl} on server`, 404)
    
})

export default routeNotFound 
