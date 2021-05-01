module.exports=function(req,res,next){
  //auth sets req.user
  //401 unauthorized
  //403 forbidden
    if (!req.user.isAdmin) return res.status(403).send('Access denied.')
    next();
}
//to pass two middlewares array has to be used ie.[auth,admin]
